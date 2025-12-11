import React, { type JSX } from 'react';
import { Link } from 'react-router-dom';
import styles from './ListGrid.module.css';

type ListGridProps<T> = {
  items: T[],
  renderItem: (item: T) => React.ReactNode,
  getLink?: (item: T) => string | null,
};

export function ListGrid<T>({ items, renderItem, getLink }: ListGridProps<T>) {
  return (
    <div className={styles.grid}>
      {items.map((item, index) => {
        const link: string | null = getLink ? getLink(item) : null

        const content: JSX.Element = (
          <div className={styles.card}>
            {renderItem(item)}
          </div>
        )

        return link ? (
          <Link key={index} to={link} className="block">
            {content}
          </Link>
        ) : (
          <div key={index}>
            {content}
          </div>
        )
      })}
    </div>
  );
}
