import { useListView } from '../context/ListViewContext';
import styles from './SearchBox.module.css';

type SearchBoxProps = {
  field: string;
  label?: string;
  placeholder?: string;
};

export default function SearchBox({
  field,
  label = 'Search',
  placeholder = 'Type to filter...',
}: SearchBoxProps) {
  const { filter, setFilter } = useListView();

  return (
    <div className={styles.root}>
      {label && <label className={styles.label}>{label}</label>}

      <input
        className={styles.input}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setFilter('name', event.target.value) }}
        placeholder={placeholder}
        type="text"
        value={filter[field] || ''}
      />
    </div>
  );
}