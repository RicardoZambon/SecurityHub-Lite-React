import { useCallback } from 'react';
import { useAppContext, type AppState } from '../../context/AppContext';
import type { Role } from '../../services/roleService';
import type { EntityList } from '../../types/entityList';
import { useEntityListBase } from '../base/useEntityListBase';

export function useRoles(): EntityList<Role> {
    const ctx: AppState = useAppContext();

    // Ensure roles are loaded.
    if (ctx.roles === undefined)
    {
        ctx.refreshRoles();
    }

    const filterRoles = useCallback((items: Role[], filter: Record<string, string | null | undefined>) => {
        let filtered = items;
        
        const applicationId = filter['applicationId'];
        if (applicationId) {
            filtered = filtered.filter((role: Role) => role.applicationId === applicationId);
        }

        const name = filter['name'];
        if (name) {
            filtered = filtered.filter((role: Role) =>
                role.name.toLowerCase().includes(name.toLowerCase().trim())
            );
        }

        return filtered;
    }, []);

    return useEntityListBase(ctx.roles, ctx.errorRoles, ctx.refreshRoles, filterRoles);
}
