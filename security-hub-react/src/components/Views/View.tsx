import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import { type Crumb } from '../../context/BreadcrumbsContext';
import { useCurrentRoute } from '../../hooks/breadcrumbs/useCurrentRoute';
import BackButton from '../BackButton';
import { ButtonsContainer } from '../ButtonsContainer';
import styles from "./View.module.css";

export type ViewProps = {
  actions?: React.ReactNode,
  buttons?: React.ReactNode,
  children: React.ReactNode,
  icon?: any,
  showBackButton?: boolean,
  title?: string,
}

export default function View({
  actions,
  buttons,
  children,
  icon,
  showBackButton = false,
  title,
}: ViewProps) {
  const currentRoute: Crumb = useCurrentRoute();

  icon ||= currentRoute?.icon;
  title ||= currentRoute?.label;

  return (
    <section className={styles.section}>
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

      {React.isValidElement(buttons) && (
        <ButtonsContainer buttons={buttons} />
      )}

      <div className={styles.content}>
        {children}
      </div>

    </section>
  );
}
