import React, { createContext, useContext, useEffect, useState } from 'react'
import { fetchApplications, type Application } from '../services/applicationService'
import { fetchRoles, type Role } from '../services/roleService'

export type AppState = {
  applications?: Application[],
  roles?: Role[],

  errorApplications: string | null,
  errorRoles: string | null,

  refreshApplications: () => Promise<void>,
  refreshRoles: () => Promise<void>,
}

const AppContext: React.Context<AppState | undefined> = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Applications state
  const [applications, setApplications] = useState<Application[] | undefined>();
  const [errorApplications, setErrorApplications] = useState<string | null>(null);

  // Roles state
  const [roles, setRoles] = useState<Role[] | undefined>();
  const [errorRoles, setErrorRoles] = useState<string | null>(null);

  // Load Applications once
  async function refreshApplications() {
    try {
      const data = await fetchApplications();
      setApplications(data);
      setErrorApplications(null);
    } catch {
      setErrorApplications('Failed to load applications');
    }
  }

  // Load Roles once
  async function refreshRoles() {
    try {
      const data = await fetchRoles();
      setRoles(data);
      setErrorRoles(null);
    } catch {
      setErrorRoles('Failed to load roles');
    }
  }

  // Load both automatically on app start
  useEffect(() => {
    refreshApplications();
    refreshRoles();
  }, [])

  return (
    <AppContext.Provider
      value={{
        applications,
        roles,

        errorApplications,
        errorRoles,

        refreshApplications,
        refreshRoles,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx: AppState | undefined = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used inside <AppProvider>');
  }
  return ctx;
}
