import React from 'react';
import type { EntityList } from '../types/entityList';
import styles from './ListGrid.module.css';
import { RefreshButton } from './buttons/RefreshButton';

export type LisGridColumn<T> = {
  property: string,
  header: string,
  minWidth?: string,
  maxWidth?: string,
  renderItem?: (item: T) => React.ReactNode,
}

type ListGridProps<T> = {
  columns: LisGridColumn<T>[],
  customButtons?: React.ReactNode,
  useEntityList: EntityList<T>,
};

export function ListGrid<T>({
  columns,
  customButtons,
  useEntityList
}: ListGridProps<T>) {
  // Clona os customButtons e injeta o selectedItem como prop
  const customButtonsWithProps = customButtons && React.isValidElement(customButtons)
    ? React.cloneElement(customButtons, { selectedItem: useEntityList.selectedItem } as any)
    : customButtons;

  const gridColumnsTemplateStyle: string[] = columns.map(col => `minmax(${col.minWidth || 0}, ${col.maxWidth || '1fr'})`);
  gridColumnsTemplateStyle.push('minmax(18px, auto)'); // For the last empty column to take remaining space and avoid the scrollbar overlaying content

  return (
    <div className={styles.gridContainer}>
      <div className={styles.buttonsContainer}>
        <RefreshButton
          refreshFunc={() => { useEntityList.refresh(); }}
          isDisabled={useEntityList.isLoading}
          isLoading={useEntityList.isFetching && !useEntityList.isLoading}
        />

        {customButtonsWithProps}
      </div>
      <div className={styles.grid} style={{ gridTemplateColumns: gridColumnsTemplateStyle.join(' ') }}>
        <div className={styles.header}>
          {columns.map((col: LisGridColumn<T>, index: number) => (
            <div key={index}>
              {col.header}
            </div>
          ))}
          <div></div>
        </div>

        <div className={styles.body}>
          {useEntityList.error && <p style={{ color: '#f97373' }}>{useEntityList.error}</p>}

          {!useEntityList.error && useEntityList.isLoading && <div className={styles.row}>
            <div className={styles.loading}>Loading...</div>
          </div>}

          {!useEntityList.isLoading && !useEntityList.error && useEntityList.displayedItems?.map((item: T, index: number) => (
            <div className={`${styles.row} ${useEntityList.selectedItem === item ? styles.selected : ''}`} key={index}>
              {columns.map((col, colIndex) => (
                <div
                  key={colIndex}
                  className={styles.cell}
                  onClick={() => useEntityList.setSelectedItem(item)}>
                  {col.renderItem ?
                    col.renderItem(item)
                    : (item as any)[col.property]
                  }
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
