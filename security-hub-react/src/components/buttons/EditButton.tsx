import { faCancel, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDataView } from '../../context/DataViewContext';
import styles from './Button.module.css';

export type EditButtonProps = {
  isDisabled?: boolean,
};

export default function EditButton({
  isDisabled = false,
}: EditButtonProps) {
  const { entityDetails, finishEditing, isDisabled: isFormDisabled, isNew, mode,  startEditing } = useDataView();
  const { isLoading, isFetching } = entityDetails || { isLoading: false, isFetching: false };

  const handleCancelClick = async () => {
    if (isDisabled || isLoading || isFetching || isNew || mode === 'view') return;
    finishEditing();
  }

  const handleEditClick = async () => {
    if (isDisabled || isLoading || isFetching || isNew || mode === 'edit') return;
    startEditing();    
  };

  return (
    <>
      {(mode === 'view' || isNew) && (
        <button
          className={styles.button}
          onClick={handleEditClick}
          disabled={isDisabled || isLoading || isFetching || isFormDisabled || isNew}
        >
          <FontAwesomeIcon icon={faEdit} />
          <span className={styles.text}>
            Edit
          </span>
        </button>
      )}

      {(mode === 'edit' && !isNew) && (
        <button
          className={styles.button}
          onClick={handleCancelClick}
          disabled={isDisabled || isLoading || isFetching || isFormDisabled}
        >
          <FontAwesomeIcon icon={faCancel} />
          <span className={styles.text}>
            Cancel Edit
          </span>
        </button>
      )}
    </>
  );
}
