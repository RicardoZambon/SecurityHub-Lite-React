import { useCallback } from 'react';
import { useAppContext, type AppState } from '../../context/AppContext';
import type { Application } from '../../services/applicationService';
import type { EntityList } from '../../types/entityList';
import { useEntityListBase } from '../base/useEntityListBase';

export function useApplications(): EntityList<Application> {
    const ctx: AppState = useAppContext();

    // Ensure roles are loaded.
    if (ctx.applications === undefined)
    {
        ctx.refreshApplications();
    }

    const filterApplications = useCallback((items: Application[], filter: Record<string, string | null | undefined>) => {
        let filtered = items;

        const name = filter['name'];
        if (name) {
            filtered = filtered.filter((role: Application) =>
                role.name.toLowerCase().includes(name.toLowerCase().trim())
            );
        }

        return filtered;
    }, []);

    return useEntityListBase(ctx.applications, ctx.errorRoles, ctx.refreshRoles, filterApplications);
}
