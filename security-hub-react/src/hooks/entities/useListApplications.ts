import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { fetchApplications, type Application } from '../../services/applicationService';
import type { EntityList } from '../../types/entityList';

const STORE_KEY = 'applications';

export function useListApplications(): EntityList<Application> {
  const { data: items, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: [STORE_KEY],
    queryFn: fetchApplications,
  });

  const filterFn = useCallback((items: Application[] | undefined, filter: Record<string, string | null | undefined>) => {
    if (!items || items.length === 0) return items;

    const name = filter['name'];
    if (name) {
      items = items.filter((app: Application) =>
        app.name?.toLowerCase().includes(name.toLowerCase().trim())
      );
    }

    return items;
  }, []);
  const handleGetItemId = useCallback((item: Application) => {
    return item?.id || '';
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
