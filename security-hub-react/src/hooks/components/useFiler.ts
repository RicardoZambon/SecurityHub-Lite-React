import { useCallback, useState } from 'react';

export function useFilter() {
  const [filter, setFilter] = useState<Record<string, string | null | undefined>>({});

  const handleSetFilter = useCallback((key: string, value?: string | null) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      [key]: value
    }));
  }, []);

  return {
    filter,
    setFilter: handleSetFilter,
  };
}