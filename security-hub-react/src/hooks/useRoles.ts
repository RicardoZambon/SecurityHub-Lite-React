import { useCallback, useEffect, useState } from 'react';
import { useAppContext, type AppState } from '../context/AppContext';
import type { Role } from '../services/roleService';
import type { BaseUseReturn } from '../types/baseUseReturn';

export function useRoles(): BaseUseReturn<Role> {
  const ctx: AppState = useAppContext();

  const [displayedItems, setDisplayedItems] = useState<Role[] | undefined>(ctx.roles);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    setIsLoading(ctx.roles === undefined);
  }, [ctx.roles]);

  useEffect(() => {
    let items: Role[] | undefined = ctx.roles;
    if (!items) {
      return;
    }
    
    const applicationId: string | undefined = filter['applicationId'];
    if (applicationId) {
      items = items.filter((role: Role) => role.applicationId === applicationId);
    }

    const name: string | undefined = filter['name'];
    if (name) {
      items = items.filter((role: Role) =>
        role.name.toLowerCase().includes(name.toLowerCase().trim()),
      );
    }

    setDisplayedItems(items);
  }, [ctx.roles, filter]);

  const handleSetFilter = useCallback((key: string, value?: string) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      [key]: value
    }));
  }, []);

  const useRole: BaseUseReturn<Role> = {
    displayedItems: displayedItems,
    error: ctx.errorRoles,
    filter: filter,
    isLoading: isLoading,
    items: ctx.roles,
    refresh: ctx.refreshRoles,
    setFilter: handleSetFilter,
  };

  return useRole;
}
