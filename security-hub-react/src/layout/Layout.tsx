import { NavLink, Outlet } from 'react-router-dom';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import styles from './Layout.module.css';

export function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.sidebar}>

        <div className={styles.brand}>
          <div className={styles.brandTitle}>Security Hub</div>
          <div className={styles.brandSubtitle}>Admin Dashboard</div>
        </div>

       <div className={styles.nav}>
          <div className={styles.sectionTitle}>Management</div>

          <NavLink
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
          </NavLink>
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
