import styles from "./SelectedBadge.module.css";

type Props = {
  name: string,
  onClear?: () => void,
}

export default function SelectedBadge({ name, onClear }: Props) {
  return (
    <div className={styles.badge}>
      <span className={styles.name}>{name}</span>

      {onClear && (
        <button className={styles.clearButton} onClick={onClear}>
          Clear
        </button>
      )}
    </div>
  );
}
