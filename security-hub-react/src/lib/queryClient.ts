import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Amount of time before data is considered outdated.
      staleTime: 5 * 60 * 1000, // 5 minutes
      
      // Amount of time unused/inactive cache data remains in memory.
      gcTime: 10 * 60 * 1000, // 10 minutes
      
      // Number of retry attempts on failure.
      retry: 1,
      
      // Refetch when window gets focused.
      refetchOnWindowFocus: false,
      
      // Refetch when reconnecting to the internet.
      refetchOnReconnect: true,
    },
  },
});
