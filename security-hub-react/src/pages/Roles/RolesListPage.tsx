import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Crumb } from '../../components/Breadcrumbs';
import { ListGrid, type LisGridColumn } from '../../components/ListGrids/ListGrid';
import { PageSection } from '../../components/PageSection';
import { SearchBox } from '../../components/SearchBox';
import { SelectedBadge } from '../../components/SelectedBadge';
import { usePage } from '../../context/PageContext';
import { useListApplications } from '../../hooks/entities/useListApplications';
import { useListRoles } from '../../hooks/entities/useListRoles';
import type { Application } from '../../services/applicationService';
import { type Role } from '../../services/roleService';

function RolesPage() {
  const { items: applications } = useListApplications();
  const [ selectedApplication, setSelectedApplication ] = useState<Application | undefined>();
  const { filter, setFilter } = usePage();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const appId: string | null = searchParams.get('appId');
    setFilter('applicationId', appId);

    const app: Application | undefined = applications?.find((a: Application) => a.id === appId);
    setSelectedApplication(app);
  }, [searchParams]);

  const dynamicCrumbs: Crumb[] = selectedApplication
    ? [{ label: selectedApplication.name, to: `/applications?appId=${selectedApplication.id}` }]
    : [];

  const columns: LisGridColumn<Role>[] = [
    { property: 'name', header: 'Role Name' },
    { property: 'applicationName', header: 'Application' },
  ];

  return (
    <PageSection
      extraBreadcrumbs={dynamicCrumbs}
      showBackButton={!!selectedApplication}
      actions={
        <SearchBox
          label="Filter by role:"
          placeholder="Search roles..."
          value={filter['name'] || ''}
          onChange={(value) => setFilter('name', value)}
        />
      }>

      {selectedApplication && (
        <SelectedBadge
          name={selectedApplication.name}
          onClear={() => setSearchParams({})}
        />
      )}

      {<ListGrid
        gridUniqueKey='roles-list-grid'
        columns={columns}
        useEntityList={useListRoles()}
      />}
    </PageSection>
  );
}

export default RolesPage;
