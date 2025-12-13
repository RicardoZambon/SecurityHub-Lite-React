import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./RefreshButton.module.css";

export function RefreshButton() {
  return (
    <button className={styles.button} onClick={() => {}}>
      <FontAwesomeIcon icon={faRefresh} />
    </button>
  );
}
