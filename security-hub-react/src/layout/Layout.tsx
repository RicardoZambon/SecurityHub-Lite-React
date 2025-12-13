import { NavLink, Outlet, type RouteObject } from 'react-router-dom';
import type { Crumb } from '../components/Breadcrumbs';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { ROUTES } from '../router';
import styles from './Layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Layout() {
  const routes = ROUTES;

  const crumbs: Crumb[] = ROUTES[0]
    .children
    .filter(r => r.handle?.title && !r.index)
    .map((m: RouteObject) => ({
      icon: m.handle?.icon,
      label: m.handle!.title!,
      to: m.path!,
    }));
  console.log('Crumbs:', crumbs, routes);

  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.sidebar}>

        <div className={styles.brand}>
          <div className={styles.brandTitle}>Security Hub</div>
          <div className={styles.brandSubtitle}>Admin Dashboard</div>
        </div>

       <div className={styles.nav}>
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

          {/* <NavLink
            to="/applications"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            Applications
          </NavLink>

          <NavLink
            to="/roles"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            Roles
          </NavLink> */}
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
        <Outlet />
      </main>
    </div>
  );
}
