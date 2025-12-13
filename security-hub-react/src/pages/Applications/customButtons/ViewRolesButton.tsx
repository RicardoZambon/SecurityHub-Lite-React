import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import type { Application } from '../../../services/applicationService';
import styles from './ViewRolesButton.module.css';

export type ViewRolesButtonProps = {
  selectedItem?: Application,
}

export function ViewRolesButton({
  selectedItem,
}: ViewRolesButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (selectedItem) {
      navigate(`/roles?appId=${selectedItem.id}`);
    }
  };

  return (
    <button 
      className={styles.button} 
      onClick={handleClick}
      disabled={!selectedItem}
    >
      <FontAwesomeIcon icon={faEye} />

      <span className={styles.text}>
        View Roles
      </span>
    </button>
  );
}
