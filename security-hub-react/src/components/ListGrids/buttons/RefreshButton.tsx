import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Button.module.css';

export type RefreshButtonProps = {
  refreshFunc: () => void,
  isDisabled?: boolean,
  isLoading?: boolean,
}

export default function RefreshButton({
  refreshFunc,
  isDisabled = false,
  isLoading = false,
}: RefreshButtonProps) {
  return (
    <button 
      className={styles.button} 
      onClick={refreshFunc}
      disabled={isLoading || isDisabled}
    >
      <FontAwesomeIcon 
        icon={faRefresh} 
        className={isLoading ? styles.spinning : ''}
      />
      <span className={styles.text}>
        {isLoading ? 'Refreshing...' : 'Refresh'}
      </span>
    </button>
  );
}
