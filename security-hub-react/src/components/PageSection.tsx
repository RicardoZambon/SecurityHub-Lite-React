import React from "react";
import { BackButton } from './BackButton';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import styles from "./PageSection.module.css";
import { useBreadcrumbs } from '../hooks/breadcrumbs/useBreadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCurrentRoute } from '../hooks/breadcrumbs/useCurrentRoute';

type PageSectionProps = {
  actions?: React.ReactNode,
  children: React.ReactNode,
  extraBreadcrumbs?: Crumb[],
  icon?: any,
  showBackButton?: boolean,
  title?: string,
}

export function PageSection({
  actions,
  children,
  extraBreadcrumbs,
  icon,
  showBackButton = false,
  title,
}: PageSectionProps) {
  const breadcrumbs: Crumb[] = useBreadcrumbs(extraBreadcrumbs);
  const currentRoute: Crumb = useCurrentRoute();

  icon ||= currentRoute.icon;
  title ||= currentRoute.label;

  return (
    <section className={styles.section}>

      {breadcrumbs && (
        <Breadcrumbs items={breadcrumbs} />
      )}

      <div className={styles.titleRow}>
        {showBackButton && <BackButton />}
        <h2 className={styles.title}>
          {icon && (
            <FontAwesomeIcon
              icon={icon}
              className={styles.titleIcon}
            />
          )}
          {title}
        </h2>

        {actions && (
          <div className={styles.actions}>
            {actions}
          </div>
        )}
      </div>

      <div className={styles.content}>
        {children}
      </div>

    </section>
  );
}
