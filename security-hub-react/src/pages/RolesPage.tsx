import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListGrid, type LisGridColumn } from '../components/ListGrid';
import { PageSection } from '../components/PageSection';
import { SearchBox } from '../components/SearchBox';
import { SelectedBadge } from '../components/SelectedBadge';
import { useApplications } from '../hooks/entities/useApplications';
import { useRoles } from '../hooks/entities/useRoles';
import type { Application } from '../services/applicationService';
import { type Role } from '../services/roleService';
import type { Crumb } from '../components/Breadcrumbs';

function RolesPage() {
  const { items: applications } = useApplications();
  const rolesHook = useRoles();

  const [searchParams, setSearchParams] = useSearchParams();
  const appId: string | null = searchParams.get('appId');

  useEffect(() => {
    rolesHook.setFilter('applicationId', appId);
  }, [appId, rolesHook.setFilter]);

  const selectedApp: Application | undefined = applications?.find((a: Application) => a.id === appId);

  const dynamicCrumbs: Crumb[] = selectedApp
    ? [{ label: selectedApp.name, to: `/applications?appId=${appId}` }]
    : [];

  const columns: LisGridColumn<Role>[] = [
    { property: 'name', header: 'Role Name' },
    { property: 'applicationName', header: 'Application' },
  ];

  return (
    <PageSection
      title="Roles"
      extraBreadcrumbs={dynamicCrumbs}
      showBackButton={!!appId}
      actions={
        <SearchBox
          label="Filter by role:"
          placeholder="Search roles..."
          value={rolesHook.filter['name'] || ''}
          onChange={(value) => rolesHook.setFilter('name', value)}
        />
      }>

      {selectedApp && (
        <SelectedBadge
          name={selectedApp.name}
          onClear={() => setSearchParams({})}
        />
      )}

      {<ListGrid
        columns={columns}
        useItems={rolesHook}
      />}
    </PageSection>
  );
}

export default RolesPage;
