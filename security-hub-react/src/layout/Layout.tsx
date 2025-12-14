import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, Outlet, type RouteObject } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { BreadcrumbsProvider, type Crumb } from '../context/BreadcrumbsContext';
import { ROUTES } from '../router';
import styles from './Layout.module.css';

export function Layout() {
  const crumbs: Crumb[] = ROUTES[0]
    .children
    .filter(r => r.handle?.title && !r.index)
    .map((m: RouteObject) => ({
      icon: m.handle?.icon,
      label: m.handle!.title!,
      to: m.path!,
    }));

  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.sidebar}>

        <div className={styles.brand}>
          <div className={styles.brandTitle}>Security Hub</div>
          <div className={styles.brandSubtitle}>Admin Dashboard</div>
        </div>

        <div className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            <FontAwesomeIcon className={styles.icon} icon={faHome}></FontAwesomeIcon>
            Home
          </NavLink>

          <div className={styles.sectionTitle}>Management</div>

          {crumbs.map((crumb: Crumb) => {
            return (
              <NavLink
                key={crumb.to}
                to={crumb.to}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                {crumb.icon && <FontAwesomeIcon className={styles.icon} icon={crumb.icon}></FontAwesomeIcon>}
                {crumb.label}
              </NavLink>
            );
          })}
        </div>

        <div className={styles.footer}>
          <div className={styles.footerSection}>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Theme
            </span>
            <ThemeSwitcher />
          </div>
        </div>

      </aside>

      <main className={styles.content}>
        <BreadcrumbsProvider>
          <Breadcrumbs />
          {/* {breadcrumbs && (<Breadcrumbs items={breadcrumbs} />)} */}
          <Outlet />
        </BreadcrumbsProvider>
      </main>
    </div>
  );
}
