import { useDataView } from '../../context/DataViewContext';
import styles from "./Input.module.css";

type SelectProps = {
  displayControlName: string;
  formControlName: string;
  label: string;
  options: { value: string; label: string }[];
};

export default function Select({
  displayControlName,
  formControlName,
  label,
  options,
}: SelectProps) {
  const { errors, formData, isDisabled, entityDetails, mode, updateField } = useDataView();
  const { isLoading, isFetching } = entityDetails || { isLoading: false, isFetching: false };
  const value = formData && formData[formControlName] || '';
  const displayValue = formData && formData[displayControlName] || '';

  const handleChange = (event: any) => {
    const { value } = event.target;
    updateField(formControlName, value);

    const selectedOption = options.find(option => option.value === value);
    updateField(displayControlName, selectedOption?.label ?? '');
  };

  const hasError: boolean = errors && errors[formControlName] ? true : false;

  return (
    <div className={styles.inputContainer}>
      <label className={label} htmlFor={formControlName}>{label}:</label>
      <div>
        {mode === "view" ? (
          <>
            {!isLoading && !isFetching && (
              <span>{displayValue}</span>
            )}
            {(isLoading || isFetching) && (
              <div className={styles.loadingValue}>
                <div className={styles.skeleton}></div>
              </div>
            )}
          </>
        ) : (
          <select
            className={`${styles.input} ${hasError ? styles.inputError : ''}`}
            defaultValue={value}
            disabled={isDisabled}
            id={formControlName}
            name={formControlName}
            onChange={handleChange}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
        <div>
          {errors && errors[formControlName] && (
            <span className={styles.errorText}>{errors[formControlName]}</span>
          )}
        </div>
      </div>
    </div>
  );
}
