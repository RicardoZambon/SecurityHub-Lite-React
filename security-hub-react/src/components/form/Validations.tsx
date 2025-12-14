import type { Errors } from '../../types/errors';
import styles from "./SharedFields.module.css";

export default function Validations({
  errors,
  formControlName,
}: { errors: Errors, formControlName: string }) {
  return (
    <>
      {errors && errors[formControlName] && (
        <>
          <div></div>
          <div>
            <span className={styles.errorText}>{errors[formControlName]}</span>
          </div>
        </>
      )}
    </>
  );
}