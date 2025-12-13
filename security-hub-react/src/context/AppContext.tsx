import React, { createContext, useContext, useState } from 'react';
import { fetchApplications, type Application } from '../services/applicationService';
import { fetchRoles, type Role } from '../services/roleService';

export type AppState = {
  applications?: Application[],
  roles?: Role[],

  errorApplications: string | undefined,
  errorRoles: string | undefined,

  refreshApplications: () => Promise<void>,
  refreshRoles: () => Promise<void>,
}

const AppContext: React.Context<AppState | undefined> = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Applications state
  const [applications, setApplications] = useState<Application[] | undefined>();
  const [errorApplications, setErrorApplications] = useState<string | undefined>();

  // Roles state
  const [roles, setRoles] = useState<Role[] | undefined>();
  const [errorRoles, setErrorRoles] = useState<string | undefined>();

  // Load Applications once
  async function refreshApplications() {
    try {
      const data: Application[] = await fetchApplications();
      setApplications(data);
      setErrorApplications(undefined);
    } catch {
      setErrorApplications('Failed to load applications');
    }
  }

  // Load Roles once
  async function refreshRoles() {
    try {
      const data: Role[] = await fetchRoles();
      setRoles(data);
      setErrorRoles(undefined);
    } catch {
      setErrorRoles('Failed to load roles');
    }
  }

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
