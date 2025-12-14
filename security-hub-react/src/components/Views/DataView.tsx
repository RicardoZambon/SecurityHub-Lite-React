import { DataViewProvider } from '../../context/DataViewContext';
import type { EntityDetails } from '../../types/entityDetails';
import styles from "./DataView.module.css";
import type { ViewProps } from './View';
import View from './View';

type DataViewProps<T> = ViewProps & {
  entityDetails?: EntityDetails<T>,
  numberOfColumns?: number,
};

export default function DataView<T>({
  actions,
  buttons,
  children,
  entityDetails,
  icon,
  numberOfColumns: columns = 3,
  showBackButton = false,
  title,
}: DataViewProps<T>) {
  return (
    <DataViewProvider entityDetails={entityDetails}>
      <View
        actions={actions}
        buttons={buttons}
        icon={icon}
        showBackButton={showBackButton}
        title={title}
      >
        <form className={styles.form} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          <div className={styles.formContainer}>
            {children}
          </div>
        </form>
      </View>
    </DataViewProvider>
  );
}