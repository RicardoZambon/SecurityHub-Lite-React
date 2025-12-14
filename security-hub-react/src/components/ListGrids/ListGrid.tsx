import React from 'react';
import { useListGridSelection } from '../../hooks/components/useListGridSelection';
import type { EntityList } from '../../types/entityList';
import type { GridSelection } from '../../types/gridSelection';
import styles from './ListGrid.module.css';
import { ListGridButtonsContainer } from './ListGridButtonsContainer';
import { usePage } from '../../context/PageContext';

export type LisGridColumn<T> = {
  property: string,
  header: string,
  minWidth?: string,
  maxWidth?: string,
  renderItem?: (item: T) => React.ReactNode,
}

type ListGridProps<T> = {
  gridUniqueKey: string,
  columns: LisGridColumn<T>[],
  customButtons?: React.ReactNode,
  useEntityList: EntityList<T>,
};

export function ListGrid<T>({
  gridUniqueKey,
  columns,
  customButtons,
  useEntityList
}: ListGridProps<T>) {
  const gridSelection: GridSelection = useListGridSelection(gridUniqueKey);

  const gridColumnsTemplateStyle: string[] = columns.map(col => `minmax(${col.minWidth || 0}, ${col.maxWidth || '1fr'})`);
  gridColumnsTemplateStyle.push('minmax(18px, auto)'); // For the last empty column to take remaining space and avoid the scrollbar overlaying content

  return (
    <div className={styles.gridContainer}>
      <ListGridButtonsContainer
        customButtons={customButtons}
        gridSelection={gridSelection}
        useEntityList={useEntityList}
      />

      <div className={styles.grid} style={{ gridTemplateColumns: gridColumnsTemplateStyle.join(' ') }}>
        <ListGridHeader<T> columns={columns} />

        <ListGridBody<T>
          columns={columns}
          gridSelection={gridSelection}
          useEntityList={useEntityList}
        />
      </div>
    </div>
  );
}

function ListGridHeader<T>({ columns }: { columns: LisGridColumn<T>[] }) {
  return (
    <div className={styles.header}>
      {columns.map((col: LisGridColumn<T>, index: number) => (
        <div key={index}>
          {col.header}
        </div>
      ))}
      <div></div>
    </div>
  );
}

function ListGridBody<T>({
  columns,
  gridSelection,
  useEntityList
}: { columns: LisGridColumn<T>[], gridSelection: GridSelection, useEntityList: EntityList<T> }) {
  const { items, error, isLoading, filterFn, getItemId } = useEntityList;
  const { selectedItemId, setSelectedItem } = gridSelection;
  const { filter } = usePage();

  const displayedItems = filterFn(items, filter) || [];

  return (
    <div className={styles.body}>
      {error && <p style={{ color: '#f97373' }}>{error}</p>}

      {!error && isLoading && <div className={styles.row}>
        <div className={styles.loading}>Loading...</div>
      </div>}

      {!isLoading && !error && displayedItems?.map((item: T, index: number) => (
        <ListGridRow<T>
          columns={columns}
          isSelected={selectedItemId === getItemId(item)}
          item={item}
          itemId={getItemId(item)}
          key={index}
          onSelect={(itemId: string) => setSelectedItem(itemId)}
        />
      ))}
    </div>
  );
}

function ListGridRow<T>({ itemId, item, columns, isSelected, onSelect }: { itemId: string, item: T, columns: LisGridColumn<T>[], isSelected?: boolean, onSelect: (itemId: string) => void }) {
  return (
    <div
      className={`${styles.row} ${isSelected ? styles.selected : ''}`}
      onClick={() => onSelect(itemId)}
    >
      {columns.map((col, colIndex) => (
        <ListGridCell<T>
          col={col}
          item={item}
          key={colIndex}
        />
      ))}
    </div>
  );
}

function ListGridCell<T>({ col, item }: { col: LisGridColumn<T>, item: any }) {
  return (
    <div className={styles.cell}>
      {col.renderItem ?
        col.renderItem(item)
        : (item as any)[col.property]
      }
    </div>
  );
}