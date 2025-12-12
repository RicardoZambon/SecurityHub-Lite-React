import React from "react";
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import styles from "./PageSection.module.css";

type PageSectionProps = {
  title: string,
  actions?: React.ReactNode,
  children: React.ReactNode,
  breadcrumbs?: Crumb[],
}

export function PageSection({
  title,
  actions,
  children,
  breadcrumbs
}: PageSectionProps) {
  return (
    <section className={styles.section}>

      {breadcrumbs && (
        <Breadcrumbs items={breadcrumbs} />
      )}

      <div className={styles.titleRow}>
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
