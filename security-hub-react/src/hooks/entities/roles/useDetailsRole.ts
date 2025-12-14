import { useQuery } from '@tanstack/react-query';
import { getRoleById, type Role } from '../../../services/roleService';
import type { EntityDetails } from '../../../types/entityDetails';

const STORE_KEY = 'roles';

export function useDetailsRole(roleId: string): EntityDetails<Role> {
  const { data: item, error, isLoading, isFetching } = useQuery({
    queryKey: [STORE_KEY, roleId],
    queryFn: () => roleId ? getRoleById(roleId) : Promise.resolve(undefined),
  });

  return {
    error: error?.message,
    isFetching,
    isLoading,
    item,
  };
}
