import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from 'react'
import { Link } from "react-router-dom"
import { useBreadcrumbs, type Crumb } from '../context/BreadcrumbsContext'
import { useCurrentRoute } from '../hooks/breadcrumbs/useCurrentRoute'
import styles from "./Breadcrumbs.module.css"

export default function Breadcrumbs() {
  const { breadcrumbs, extraBreadcrumbs } = useBreadcrumbs();
  const currentPage = useCurrentRoute();

  let displayedBreadcrumbs = [...breadcrumbs, ...(extraBreadcrumbs || [])];

  return (
    <>
      {currentPage && (
        <nav className={styles.root} aria-label="Breadcrumb">
          <Link to={'/'} className={styles.crumbLink}>
            <FontAwesomeIcon icon={faHome} className={styles.crumbIcon} />
          </Link>

          <div>
            <FontAwesomeIcon icon={faChevronRight} className={styles.separator} />
          </div>

          {displayedBreadcrumbs.map((item: Crumb, idx: number) => {
            const isLast: boolean = idx === displayedBreadcrumbs.length - 1;

            return (
              <React.Fragment key={idx}>
                <Crumb item={item} isLast={isLast} />
                {!isLast && (<FontAwesomeIcon icon={faChevronRight} className={styles.separator} />)}
              </React.Fragment>
            );
          })}
        </nav>
      )}
    </>
  )
}

function Crumb({ item, isLast }: { item: Crumb, isLast: boolean }) {
  return (
    <>
      {!item.to || isLast ? (
        <span className={`${styles.crumbCurrent} ${isLast ? 'crumbCurrent' : ''}`}>{item.label}</span>
      ) : (
        <Link to={item.to} className={styles.crumbLink}>
          {item.label}
        </Link>
      )}
    </>
  );
}