import React from 'react';
import type { EntityList } from '../../types/entityList';
import type { GridSelection } from '../../types/gridSelection';
import { RefreshButton } from './buttons/RefreshButton';
import styles from './ListGridButtonsContainer.module.css';

type ListGridButtonsContainerProps<T> = {
  customButtons?: React.ReactNode,
  gridSelection: GridSelection,
  useEntityList: EntityList<T>,
};

export function ListGridButtonsContainer<T>({
  customButtons,
  gridSelection,
  useEntityList,
}: ListGridButtonsContainerProps<T>) {
  const { selectedItemId } = gridSelection;

  // Clones the customButtons and injects the selectedItem as a prop.
  const customButtonsWithProps = customButtons && React.isValidElement(customButtons)
    ? React.cloneElement(customButtons, { selectedItemId } as any)
    : customButtons;

  return (
    <div className={styles.buttonsContainer}>
      <RefreshButton
        refreshFunc={() => { useEntityList.refresh(); }}
        isDisabled={useEntityList.isLoading}
        isLoading={useEntityList.isFetching && !useEntityList.isLoading}
      />

      {customButtonsWithProps}
    </div>
  )
}