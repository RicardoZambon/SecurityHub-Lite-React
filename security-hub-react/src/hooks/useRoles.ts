import { useAppContext, type AppState } from '../context/AppContext';

export function useRoles() {
  const ctx: AppState = useAppContext();

  return {
    roles: ctx.roles,
    isLoading: ctx.isLoadingRoles,
    error: ctx.errorRoles,
    refreshRoles: ctx.refreshRoles,
  };
}
