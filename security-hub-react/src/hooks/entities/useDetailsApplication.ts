import { useQuery } from '@tanstack/react-query';
import { getApplicationById, type Application } from '../../services/applicationService';
import type { EntityDetails } from '../../types/entityDetails';

const STORE_KEY = 'applications';

export function useDetailsApplication(applicationId: string): EntityDetails<Application> {
  const { data: item, error, isLoading, isFetching } = useQuery({
    queryKey: [STORE_KEY, applicationId],
    queryFn: () => applicationId ? getApplicationById(applicationId) : Promise.resolve(undefined),
  });

  return {
    error: error?.message,
    isFetching,
    isLoading,
    item,
  };
}
