import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './RefreshButton.module.css';

export type RefreshButtonProps = {
  refreshFunc: () => void,
  isDisabled?: boolean,
  isLoading?: boolean,
}

export function RefreshButton({
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
