import React from "react";
import { BackButton } from './BackButton';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import styles from "./PageSection.module.css";
import { useBreadcrumbs } from '../hooks/breadcrumbs/useBreadcrumbs';

type PageSectionProps = {
  title: string,
  actions?: React.ReactNode,
  children: React.ReactNode,
  extraBreadcrumbs?: Crumb[],
  showBackButton?: boolean,
}

export function PageSection({
  title,
  actions,
  children,
  extraBreadcrumbs,
  showBackButton = false
}: PageSectionProps) {
  const breadcrumbs = useBreadcrumbs(extraBreadcrumbs);

  return (
    <section className={styles.section}>

      {breadcrumbs && (
        <Breadcrumbs items={breadcrumbs} />
      )}

      <div className={styles.titleRow}>
        {showBackButton && <BackButton />}
        <h2 className={styles.title}>{title}</h2>

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
