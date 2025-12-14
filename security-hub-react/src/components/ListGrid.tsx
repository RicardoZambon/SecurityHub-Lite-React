import React, { useEffect } from 'react';
import { useListView } from '../context/ListContext';
import type { EntityList } from '../types/entityList';
import styles from './ListGrid.module.css';

export type LisGridColumn<T> = {
  property: string,
  header: string,
  minWidth?: string,
  maxWidth?: string,
  renderItem?: (item: T) => React.ReactNode,
}

type ListGridProps<T> = {
  columns: LisGridColumn<T>[],
  fixedFilter?: Record<string, string | null | undefined>,
  useEntityList: EntityList<T>,
};

export default function ListGrid<T>({
  columns,
  fixedFilter,
  useEntityList
}: ListGridProps<T>) {
  const { setFilter } = useListView();

  const gridColumnsTemplateStyle: string[] = columns.map(col => `minmax(${col.minWidth || 0}, ${col.maxWidth || '1fr'})`);
  gridColumnsTemplateStyle.push('minmax(18px, auto)'); // For the last empty column to take remaining space and avoid the scrollbar overlaying content

  useEffect(() => {
    if (!fixedFilter) {
      return;
    }

    Object.keys(fixedFilter).forEach(key => {
      setFilter(key, fixedFilter[key]);
    });
  }, [fixedFilter]);

  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid} style={{ gridTemplateColumns: gridColumnsTemplateStyle.join(' ') }}>
        <ListGridHeader<T> columns={columns} />

        <ListGridBody<T>
          columns={columns}
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
  useEntityList
}: { columns: LisGridColumn<T>[], useEntityList: EntityList<T> }) {
  const { items, error, isLoading, filterFn, getItemId } = useEntityList;
  const { filter, selectedItemId } = useListView();

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
        />
      ))}
    </div>
  );
}

function ListGridRow<T>({ itemId, item, columns, isSelected }: { itemId: string, item: T, columns: LisGridColumn<T>[], isSelected?: boolean }) {
  const { setSelectedItemId } = useListView();
  return (
    <div
      className={`${styles.row} ${isSelected ? styles.selected : ''}`}
      onClick={() => setSelectedItemId(itemId)}
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