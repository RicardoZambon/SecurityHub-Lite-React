import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import styles from './ViewRolesButton.module.css';

export type ViewRolesButtonProps = {
  selectedItemId?: number,
}

export function ViewRolesButton({
  selectedItemId,
}: ViewRolesButtonProps) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (!selectedItemId) {
      return;
    }

    navigate(`/roles?appId=${selectedItemId}`);
  };

  return (
    <button 
      className={styles.button} 
      disabled={!selectedItemId}
      onClick={handleButtonClick}
    >
      <FontAwesomeIcon icon={faEye} />

      <span className={styles.text}>
        View Roles
      </span>
    </button>
  );
}
