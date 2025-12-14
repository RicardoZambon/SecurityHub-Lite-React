import styles from "./FormRegion.module.css";

export default function FormRegion({
  children,
  title,
}: { children?: React.ReactNode, title: string }) {
  return (
    <>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.regionContainer}>
        {children}
      </div>
    </>
  );
}