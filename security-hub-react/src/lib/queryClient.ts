import { QueryClient } from '@tanstack/react-query';

// Store de seleção global (persiste durante toda a sessão)
type SelectionStore = {
  selectedApplicationId?: string;
  selectedRoleId?: string;
};

const selectionStore: SelectionStore = {};

export const getSelectedApplicationId = () => selectionStore.selectedApplicationId;
export const setSelectedApplicationId = (id?: string) => {
  selectionStore.selectedApplicationId = id;
};

export const getSelectedRoleId = () => selectionStore.selectedRoleId;
export const setSelectedRoleId = (id?: string) => {
  selectionStore.selectedRoleId = id;
};

// Configuração do QueryClient
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Quanto tempo os dados são considerados "frescos" (não precisa refetch)
      staleTime: 5 * 60 * 1000, // 5 minutos
      
      // Quanto tempo manter dados no cache sem uso
      gcTime: 10 * 60 * 1000, // 10 minutos (antigo cacheTime)
      
      // Retentar em caso de erro
      retry: 1,
      
      // Refetch quando a janela ganha foco
      refetchOnWindowFocus: false,
      
      // Refetch quando reconecta à internet
      refetchOnReconnect: true,
    },
  },
});
