import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useListView } from '../../../context/ListContext';
import styles from './ViewRolesButton.module.css';

export function ViewRolesButton() {
  const navigate = useNavigate();
  const { selectedItemId } = useListView();

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
