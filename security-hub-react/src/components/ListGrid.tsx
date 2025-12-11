import React from 'react';
import styles from './ListGrid.module.scss';

type ListGridProps<T> = {
  items: T[],
  renderItem: (item: T) => React.ReactNode,
};

export function ListGrid<T>({ items, renderItem }: ListGridProps<T>) {
  return (
    <div className={styles.grid}>
      {items.map((item: T, i: number) => (
        <div key={i} className={styles.card}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}
