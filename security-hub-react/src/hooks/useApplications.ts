
import { useCallback, useEffect, useState } from 'react';
import { useAppContext, type AppState } from '../context/AppContext';
import type { Application } from '../services/applicationService';
import type { BaseUseReturn } from '../types/baseUseReturn';

export function useApplications(): BaseUseReturn<Application> {
  const ctx: AppState = useAppContext();
  
  const [displayedItems, setDisplayedItems] = useState<Application[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    setIsLoading(ctx.applications === undefined);
  }, [ctx.applications]);

  useEffect(() => {
      let items: Application[] | undefined = ctx.applications;
      if (!items) {
        return;
      }
  
      const name: string | undefined = filter['name'];
      if (name) {
        items = items.filter((application: Application) =>
          application.name.toLowerCase().includes(name.toLowerCase().trim()),
        );
      }
  
      setDisplayedItems(items);
    }, [ctx.applications, filter]);

  const handleSetFilter = useCallback((key: string, value?: string) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      [key]: value
    }));
  }, []);

  const useApplication: BaseUseReturn<Application> = {
    displayedItems: displayedItems,
    error: ctx.errorApplications,
    filter: filter,
    isLoading: isLoading,
    items: ctx.applications,
    refresh: ctx.refreshApplications,
    setFilter: handleSetFilter,
  };

  return useApplication;
}