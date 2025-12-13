import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchApplications, type Application } from '../../services/applicationService';
import type { EntityList } from '../../types/entityList';
import { getSelectedId, setSelectedId } from '../../lib/queryClient';

const STORE_KEY = 'applications';

export function useListApplications(): EntityList<Application> {
  const { data: items, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: [STORE_KEY],
    queryFn: fetchApplications,
  });

  const [filter, setFilter] = useState<Record<string, string | null | undefined>>({});
  const [displayedItems, setDisplayedItems] = useState<Application[] | undefined>(items);

  const [, forceUpdate] = useState({});

  const selectedId = getSelectedId(STORE_KEY);
  const selectedItem = items?.find(app => app.id === selectedId);

  useEffect(() => {
    if (!items) {
      setDisplayedItems(undefined);
      return;
    }

    let filtered = items;

    const name = filter['name'];
    if (name) {
      filtered = filtered.filter((app: Application) =>
        app.name.toLowerCase().includes(name.toLowerCase().trim())
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

  const handleSelection = useCallback((item: Application | undefined) => {
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
