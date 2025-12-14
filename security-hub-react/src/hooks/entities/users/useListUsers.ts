import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { fetchUsers, type User } from '../../../services/userService';
import type { EntityList } from '../../../types/entityList';

const STORE_KEY = 'users';

export function useListUsers(): EntityList<User> {
  const { data: items, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: [STORE_KEY],
    queryFn: fetchUsers,
  });

  const filterFn = useCallback((items: User[] | undefined, filter: Record<string, string | null | undefined>) => {
    if (!items || items.length === 0) return items;

    const name = filter['name'];
    if (name) {
      items = items.filter((user: User) =>
        user.name.toLowerCase().includes(name.toLowerCase().trim())
      );
    }

    return items;
  }, []);

  const handleGetItemId = useCallback((item: User) => {
    return item?.id;
  }, []);

  const refresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return {
    error: error?.message,
    filterFn,
    getItemId: handleGetItemId,
    isFetching,
    isLoading,
    items,
    refresh,
  };
}
