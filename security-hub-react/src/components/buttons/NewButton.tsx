import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import styles from './Button.module.css';

export type NewButtonProps = {
  isDisabled?: boolean,
  path?: string,
};

export default function NewButton({
  isDisabled = false,
  path,
}: NewButtonProps) {
  const navigate = useNavigate();

  const currentPath: string = window.location.pathname;
  const isAlreadyAtNewPage: boolean = currentPath.endsWith('/new');

  const handleButtonClick = () => {
    let redirectPath: string  = 'new';
    if (path && path.length > 0) {
      redirectPath = `${path}/${redirectPath}`;
    }
    
    navigate(redirectPath);
  };

  return (
    <button
      className={styles.button}
      onClick={handleButtonClick}
      disabled={isDisabled || isAlreadyAtNewPage}
    >
      <FontAwesomeIcon icon={faPlus} />
      <span className={styles.text}>
        New
      </span>
    </button>
  );
}
