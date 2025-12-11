import styles from './SearchBox.module.scss';

type SearchBoxProps = {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (newValue: string) => void;
};

export function SearchBox({
    label = 'Search',
    placeholder = 'Type to filter...',
    value,
    onChange,
}: SearchBoxProps) {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className={styles.root}>
            {label && <label className={styles.label}>{label}</label>}

            <input
                type="text"
                className={styles.input}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
            />
        </div>
    );
}