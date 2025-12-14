import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { fetchRoles, type Role } from '../../services/roleService';
import type { EntityList } from '../../types/entityList';

const STORE_KEY = 'roles';

export function useListRoles(): EntityList<Role> {
  const { data: items, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: [STORE_KEY],
    queryFn: fetchRoles,
  });
  const filterFn = useCallback((items: Role[] | undefined, filter: Record<string, string | null | undefined>) => {
    if (!items || items.length === 0) return items;

    const applicationId = filter['applicationId'];
    if (applicationId) {
      items = items.filter((role: Role) => role.applicationId === applicationId);
    }

    const name = filter['name'];
    if (name) {
      items = items.filter((role: Role) =>
        role.name.toLowerCase().includes(name.toLowerCase().trim())
      );
    }

    return items;
  }, []);

  const handleGetItemId = useCallback((item: Role) => {
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
