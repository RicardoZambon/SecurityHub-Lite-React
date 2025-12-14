import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import styles from './Button.module.css';

export type NewButtonProps = {
  isDisabled?: boolean,
};

export default function NewButton({
  isDisabled = false,
}: NewButtonProps) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`new`);
  };

  return (
    <button
      className={styles.button}
      onClick={handleButtonClick}
      disabled={isDisabled}
    >
      <FontAwesomeIcon icon={faPlus} />
      <span className={styles.text}>
        New
      </span>
    </button>
  );
}
