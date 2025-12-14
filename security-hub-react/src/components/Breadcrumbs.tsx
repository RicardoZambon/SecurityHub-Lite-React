import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import styles from "./Breadcrumbs.module.css"
import { useBreadcrumbs, type Crumb } from '../context/BreadcrumbsContext'

export default function Breadcrumbs() {
  const { breadcrumbs, extraBreadcrumbs } = useBreadcrumbs();
  breadcrumbs.push(...(extraBreadcrumbs || []));

  return (
    <nav className={styles.root} aria-label="Breadcrumb">
      {breadcrumbs.map((item: Crumb, idx: number) => {
        const isLast: boolean = idx === breadcrumbs.length - 1

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
