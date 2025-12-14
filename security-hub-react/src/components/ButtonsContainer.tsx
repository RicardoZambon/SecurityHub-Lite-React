import React from 'react';
import type { EntityList } from '../types/entityList';
import type { GridSelection } from '../types/gridSelection';
import styles from './ButtonsContainer.module.css';
import NewButton from './ListGrids/buttons/NewButton';
import RefreshButton from './ListGrids/buttons/RefreshButton';

type ButtonsContainerProps<T> = {
  buttons?: React.ReactNode,
};

export function ButtonsContainer<T>({
  buttons,
}: ButtonsContainerProps<T>) {
  //const { isLoading, isFetching, refresh } = useEntityList;
  //const { selectedItemId } = gridSelection;

  // Clones the customButtons and injects the selectedItem as a prop.
  // const customButtonsWithProps = buttons && React.isValidElement(buttons)
  //   ? React.cloneElement(customButtons, { selectedItemId } as any)
  //   : customButtons;

  return (
    <div className={styles.buttonsContainer}>
      {/* <NewButton
        isDisabled={isLoading}
      />

      <RefreshButton
        refreshFunc={() => { refresh(); }}
        isDisabled={isLoading}
        isLoading={isFetching && !isLoading}
      /> */}

      {React.isValidElement(buttons) && buttons}
    </div>
  )
}