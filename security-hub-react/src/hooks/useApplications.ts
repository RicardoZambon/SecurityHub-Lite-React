
import { useAppContext, type AppState } from '../context/AppContext';

export function useApplications() {
  const ctx: AppState = useAppContext();

  return {
    applications: ctx.applications,
    isLoading: ctx.isLoadingApplications,
    error: ctx.errorApplications,
    refreshApplications: ctx.refreshApplications,
  };
}