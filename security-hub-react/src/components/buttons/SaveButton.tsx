import { faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useDataView } from '../../context/DataViewContext';
import type { Errors } from '../../types/errors';
import styles from './Button.module.css';
import { useNavigate } from 'react-router-dom';

export type SaveButtonProps<T> = {
  isDisabled?: boolean,
  onSave: (item: T) => Promise<string>,
  validator: (item: T) => Promise<Errors | null>,
};

export default function SaveButton<T>({
  isDisabled = false,
  onSave,
  validator,
}: SaveButtonProps<T>) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { clearErrors, disable: disableForm, enable: enableForm, entityDetails, finishEditing, formData, isDisabled: isFormDisabled, mode, setErrors } = useDataView();
  const [isLoading, setIsLoading] = useState(false);

  // If there are no entityDetails, we are creating a new entity.
  const isNewEntity: boolean = !entityDetails;

  const { mutate: onSaveMutate, isPending } = useMutation({
    mutationFn: onSave,
    onSuccess: (itemId: string) => {
      enableForm();
      setIsLoading(false);
      queryClient.invalidateQueries({ queryKey: ['applications'] });

      if (isNewEntity) {
        // If we just created a new entity, we need to redirect to the new entity's detail page.

        // Retrieve current route, and replace "new" with the new itemId.
        const currentPath: string = window.location.pathname;
        const newPath: string = currentPath.replace('/new', `/${itemId}`);
        window.history.replaceState({}, '', newPath);
        
        navigate(newPath);
        
      } else {
        queryClient.invalidateQueries({ queryKey: ['entityDetails', itemId] });
        finishEditing();
      }
    },
    onError: (error: Error) => {
      enableForm();
      setIsLoading(false);
      console.error('Error saving data', error);
    },
  });

  const handleButtonClick = async () => {
    if (isDisabled || mode !== 'edit') return;

    clearErrors();
    setIsLoading(true);
    disableForm();

    const errors = await validator(formData as T);
    setErrors(errors || {});

    if (errors && Object.keys(errors).length > 0) {
      enableForm();
      setIsLoading(false);
      return;
    }

    onSaveMutate(formData as T);
  };

  return (
    <button
      className={styles.button}
      onClick={handleButtonClick}
      disabled={isDisabled || isFormDisabled || isPending || isLoading || mode !== 'edit'}
    >
      <FontAwesomeIcon icon={isLoading ? faSpinner : faSave} className={isLoading ? styles.spinning : ''} />
      <span className={styles.text}>
        {isLoading ? 'Saving...' : 'Save'}
      </span>
    </button>
  );
}
