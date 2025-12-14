import { useQuery } from '@tanstack/react-query';
import { getUserById, type User } from '../../../services/userService';
import type { EntityDetails } from '../../../types/entityDetails';

const STORE_KEY = 'users';

export function useDetailsUser(userId: string): EntityDetails<User> {
  const { data: item, error, isLoading, isFetching } = useQuery({
    queryKey: [STORE_KEY, userId],
    queryFn: () => userId ? getUserById(userId) : Promise.resolve(undefined),
  });

  return {
    error: error?.message,
    isFetching,
    isLoading,
    item,
  };
}