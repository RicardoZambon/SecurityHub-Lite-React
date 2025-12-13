import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import styles from "./Breadcrumbs.module.css"

export type Crumb = {
  label: string,
  to: string,
  icon?: any,
}

type BreadcrumbsProps = {
  items: Crumb[],
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className={styles.root} aria-label="Breadcrumb">
      {items.map((item: Crumb, idx: number) => {
        const isLast: boolean = idx === items.length - 1

        return (
          <div key={idx} className={styles.crumbWrapper}>

            {item.icon && (
              <FontAwesomeIcon
                icon={item.icon}
                className={styles.crumbIcon}
              />
            )}

            {item.to && !isLast ? (
              <Link to={item.to} className={styles.crumbLink}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.crumbCurrent}>{item.label}</span>
            )}

            {!isLast && (
              <FontAwesomeIcon
                icon={faChevronRight}
                className={styles.separator}
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}
