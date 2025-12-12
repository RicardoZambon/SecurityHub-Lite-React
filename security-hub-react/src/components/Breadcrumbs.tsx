import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

export type Crumb = {
  label: string,
  to?: string,
}

type BreadcrumbsProps = {
  items: Crumb[],
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className={styles.root} aria-label="Breadcrumb">
      {items.map((item, idx) => (
        <div key={idx} className={styles.crumbWrapper}>
          {item.to ? (
            <Link to={item.to} className={styles.crumbLink}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.crumbCurrent}>{item.label}</span>
          )}

          {idx < items.length - 1 && (
            <span className={styles.separator}>/</span>
          )}
        </div>
      ))}
    </nav>
  );
}
