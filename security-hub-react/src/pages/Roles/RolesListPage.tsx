import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Crumb } from '../../components/Breadcrumbs';
import { ListGrid, type LisGridColumn } from '../../components/ListGrid';
import { PageSection } from '../../components/PageSection';
import { SearchBox } from '../../components/SearchBox';
import { SelectedBadge } from '../../components/SelectedBadge';
import { useListApplications } from '../../hooks/entities/useListApplications';
import { useListRoles } from '../../hooks/entities/useListRoles';
import type { Application } from '../../services/applicationService';
import { type Role } from '../../services/roleService';

function RolesPage() {
  const { items: applications } = useListApplications();
  const rolesListHook = useListRoles();

  const [searchParams, setSearchParams] = useSearchParams();
  const appId: string | null = searchParams.get('appId');

  useEffect(() => {
    rolesListHook.setFilter('applicationId', appId);
  }, [appId, rolesListHook.setFilter]);

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
      extraBreadcrumbs={dynamicCrumbs}
      showBackButton={!!appId}
      actions={
        <SearchBox
          label="Filter by role:"
          placeholder="Search roles..."
          value={rolesListHook.filter['name'] || ''}
          onChange={(value) => rolesListHook.setFilter('name', value)}
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
        useEntityList={rolesListHook}
      />}
    </PageSection>
  );
}

export default RolesPage;
