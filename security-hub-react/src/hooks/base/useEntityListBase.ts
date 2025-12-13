import { useCallback, useEffect, useState } from 'react';
import type { EntityList } from '../../types/entityList';

export function useEntityListBase<T>(
    items: T[] | undefined,
    error: string | undefined,
    refresh: () => Promise<void>,
    filterFunction: (items: T[], filter: Record<string, string | null | undefined>) => T[]
): EntityList<T> {
    const [displayedItems, setDisplayedItems] = useState<T[] | undefined>(items);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<Record<string, string | null | undefined>>({});

    useEffect(() => {
        setIsLoading(items === undefined);
    }, [items]);

    useEffect(() => {
        if (!items) {
            return;
        }
        
        const filteredItems = filterFunction(items, filter);
        setDisplayedItems(filteredItems);
    }, [items, filter, filterFunction]);

    const handleSetFilter = useCallback((key: string, value?: string | null) => {
        setFilter(prevFilter => ({
            ...prevFilter,
            [key]: value
        }));
    }, []);

    return {
        displayedItems,
        error,
        filter,
        isLoading,
        items,
        refresh,
        setFilter: handleSetFilter,
    };
}
