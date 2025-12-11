import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

export function Layout() {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          Security Hub
        </div>

        <nav className={styles.nav}>
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
        </nav>
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
