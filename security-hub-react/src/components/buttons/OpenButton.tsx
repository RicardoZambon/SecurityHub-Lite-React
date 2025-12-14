import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useListView } from '../../context/ListViewContext';
import styles from './Button.module.css';

export type OpenButtonProps = {
  isDisabled?: boolean,
};

export default function OpenButton({
  isDisabled = false,
}: OpenButtonProps) {
  const navigate = useNavigate();
  const { selectedItemId } = useListView();

  const handleButtonClick = () => {
    if (!selectedItemId) {
      return;
    }

    navigate(selectedItemId);
  };

  return (
    <button
      className={styles.button}
      onClick={handleButtonClick}
      disabled={isDisabled || !selectedItemId}
    >
      <FontAwesomeIcon icon={faEye} />
      <span className={styles.text}>
        Open
      </span>
    </button>
  );
}
