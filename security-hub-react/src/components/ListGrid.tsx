import React from 'react';
import { Link } from 'react-router-dom';
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
  useItems: EntityList<T>,
  getLink?: (item: T) => string | null,
};

export function ListGrid<T>({ columns, useItems, getLink }: ListGridProps<T>) {
  const gridColumnsTemplateStyle: string[] = columns.map(col => `minmax(${col.minWidth || 0}, ${col.maxWidth || '1fr'})`);
  gridColumnsTemplateStyle.push('minmax(18px, auto)'); // For the last empty column to take remaining space and avoid the scrollbar overlaying content

  return (
    <div className={styles.gridContainer}>
      <div className={styles.buttonsContainer}>
        <RefreshButton
          refreshFunc={() => { useItems.refresh(); }}
          isDisabled={useItems.isLoading}
          isLoading={useItems.isFetching && !useItems.isLoading}
        />
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
          {useItems.error && <p style={{ color: '#f97373' }}>{useItems.error}</p>}

          {!useItems.error && useItems.isLoading && <div className={styles.row}>
            <div className={styles.loading}>Loading...</div>
          </div>}

          {!useItems.isLoading && !useItems.error && useItems.displayedItems?.map((item: T, index: number) => (
            <div className={styles.row} key={index}>
              {columns.map((col, colIndex) => {
                const link: string | null = getLink ? getLink(item) : null;
                const content: React.ReactNode = cell(item, col);

                return link ? (
                  <Link key={colIndex} to={link} className={styles.link}>
                    {content}
                  </Link>
                ) : (
                  <React.Fragment key={colIndex}>
                    {content}
                  </React.Fragment>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function cell<T>(item: T, column: LisGridColumn<T>): React.ReactNode {
  return (
    <div className={styles.cell}>
      {column.renderItem ?
        column.renderItem(item)
        : (item as any)[column.property]
      }
    </div>
  );
}