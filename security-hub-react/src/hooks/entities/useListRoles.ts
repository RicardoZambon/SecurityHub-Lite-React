import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRoles, type Role } from '../../services/roleService';
import type { EntityList } from '../../types/entityList';
import { getSelectedRoleId, setSelectedRoleId } from '../../lib/queryClient';

export function useListRoles(): EntityList<Role> {
  // React Query gerencia o fetch, cache, loading e error automaticamente
  const { data: items, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['roles'], // Identificador único para o cache
    queryFn: fetchRoles,  // Função que busca os dados
  });

  // Estado local para filtros e items filtrados
  const [filter, setFilter] = useState<Record<string, string | null | undefined>>({});
  const [displayedItems, setDisplayedItems] = useState<Role[] | undefined>(items);
  
  // Força re-render quando a seleção muda
  const [, forceUpdate] = useState({});
  
  // Recupera selectedItem do store global
  const selectedId = getSelectedRoleId();
  const selectedItem = items?.find(role => role.id === selectedId);

  // Atualiza displayedItems quando items ou filter mudam
  useEffect(() => {
    if (!items) {
      setDisplayedItems(undefined);
      return;
    }

    let filtered = items;

    const applicationId = filter['applicationId'];
    if (applicationId) {
      filtered = filtered.filter((role: Role) => role.applicationId === applicationId);
    }

    const name = filter['name'];
    if (name) {
      filtered = filtered.filter((role: Role) =>
        role.name.toLowerCase().includes(name.toLowerCase().trim())
      );
    }

    setDisplayedItems(filtered);
  }, [items, filter]);

  // Função memoizada para atualizar filtros
  const handleSetFilter = useCallback((key: string, value?: string | null) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      [key]: value
    }));
  }, []);

  const handleSelection = useCallback((item: Role | undefined) => {
    setSelectedRoleId(item?.id);
    forceUpdate({}); // Força re-render
  }, []);

  // Wrapper para refetch que retorna Promise<void>
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
