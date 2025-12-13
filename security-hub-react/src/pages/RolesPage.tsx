import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListGrid, type LisGridColumn } from '../components/ListGrid';
import { PageSection } from '../components/PageSection';
import { SearchBox } from '../components/SearchBox';
import { SelectedBadge } from '../components/SelectedBadge';
import { useApplications } from '../hooks/useApplications';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { useRoles } from '../hooks/useRoles';
import type { Application } from '../services/applicationService';
import { type Role } from '../services/roleService';

function RolesPage() {
  const { roles, isLoading, error } = useRoles();
  const { applications } = useApplications();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const appId: string | null = searchParams.get('appId');
  const selectedApp: Application | undefined = applications.find(a => a.id === appId);

  const dynamicCrumbs = selectedApp
    ? [{ label: selectedApp.name, to: `/applications?appId=${appId}` }]
    : [];

  const columns: LisGridColumn<Application>[] = [
    { property: 'name', header: 'Role Name' },
    { property: 'applicationName', header: 'Application'},
  ];

  const filteredRoles: Role[] = roles
    .filter((role: Role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
    )
    .filter((role: Role) => (appId ? role.applicationId === appId : true));

  return (
    <PageSection
      title="Roles"
      breadcrumbs={useBreadcrumbs(dynamicCrumbs)}
      showBackButton={!!appId}
      actions={
        <SearchBox
          label="Filter by role:"
          placeholder="Search roles..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      }>

      {selectedApp && (
        <SelectedBadge
          name={selectedApp.name}
          onClear={() => setSearchParams({})}
        />
      )}

      {isLoading && <p>Loading roles...</p>}
      {error && <p style={{ color: '#f97373' }}>{error}</p>}

      {!isLoading && !error && <ListGrid
        columns={columns}
        items={filteredRoles}
      />}
    </PageSection>
  );
}

export default RolesPage;
