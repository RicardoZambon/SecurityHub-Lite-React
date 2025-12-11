import React from "react";
import styles from "./PageSection.module.css";

type PageSectionProps = {
  title: string,
  actions?: React.ReactNode,
  children: React.ReactNode,
}

export function PageSection({ title, actions, children }: PageSectionProps) {
  return (
    <section className={styles.section}>

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
