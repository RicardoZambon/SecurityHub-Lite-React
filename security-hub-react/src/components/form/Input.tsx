import { useDataView } from '../../context/DataViewContext';
import styles from "./SharedFields.module.css";
import Validations from './Validations';

type InputProps = {
  formControlName: string;
  label: string;
};

export default function Input({
  formControlName,
  label,
}: InputProps) {
  const { errors, formData, isDisabled, entityDetails, mode, updateField } = useDataView();
  const { isLoading, isFetching } = entityDetails || { isLoading: false, isFetching: false };
  const value = formData && formData[formControlName] || '';

  const handleChange = (event: any) => {
    const { value } = event.target;
    updateField(formControlName, value);
  };

  const hasError: boolean = errors && errors[formControlName] ? true : false;

  return (
    <>
      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor={formControlName}>{label}:</label>
        <div>
          {mode === "view" ? (
            <>
              {!isLoading && !isFetching && (
                <span>{value}</span>
              )}
              {(isLoading || isFetching) && (
                <div className={styles.loadingValue}>
                  <div className={styles.skeleton}></div>
                </div>
              )}
            </>
          ) : (
            <input
              className={`${styles.input} ${hasError ? styles.inputError : ''}`}
              disabled={isDisabled}
              id={formControlName}
              name={formControlName}
              onChange={handleChange}
              type="text"
              value={value}
            />
          )}
        </div>

        <Validations errors={errors} formControlName={formControlName} />
      </div>
    </>
  );
}
