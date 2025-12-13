import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { getSelectedId, setSelectedId } from '../../lib/queryClient';
import { fetchUsers, type User } from '../../services/userService';
import type { EntityList } from '../../types/entityList';

const STORE_KEY = 'users';

export function useListUsers(): EntityList<User> {
  const { data: items, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: [STORE_KEY],
    queryFn: fetchUsers,
  });

  const [filter, setFilter] = useState<Record<string, string | null | undefined>>({});
  const [displayedItems, setDisplayedItems] = useState<User[] | undefined>(items);
  
  const [, forceUpdate] = useState({});
  
  const selectedId = getSelectedId(STORE_KEY);
  const selectedItem = items?.find(user => user.id === selectedId);

  useEffect(() => {
    if (!items) {
      setDisplayedItems(undefined);
      return;
    }

    let filtered = items;

    const name = filter['name'];
    if (name) {
      filtered = filtered.filter((user: User) =>
        user.name.toLowerCase().includes(name.toLowerCase().trim())
      );
    }

    setDisplayedItems(filtered);
  }, [items, filter]);

  const handleSetFilter = useCallback((key: string, value?: string | null) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      [key]: value
    }));
  }, []);

  const handleSelection = useCallback((item: User | undefined) => {
    setSelectedId(STORE_KEY, item?.id);
    forceUpdate({});
  }, []);

  const refresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return {
    displayedItems,
    error: error?.message,
    filter,
    isFetching,
    isLoading,
    items,
    refresh,
    selectedItem,
    setFilter: handleSetFilter,
    setSelectedItem: handleSelection,
  };
}
