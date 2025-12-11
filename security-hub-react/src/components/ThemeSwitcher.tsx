import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../context/ThemeContext";
import styles from "./ThemeSwitcher.module.css";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={styles.button} onClick={toggleTheme}>
      <span
        className={`${styles.icon} ${
          theme === "light" ? styles.iconVisible : styles.iconHidden
        }`}
      >
        <FontAwesomeIcon icon={faSun} />
      </span>

      <span
        className={`${styles.icon} ${
          theme === "dark" ? styles.iconVisible : styles.iconHidden
        }`}
      >
        <FontAwesomeIcon icon={faMoon} />
      </span>
    </button>
  );
}
