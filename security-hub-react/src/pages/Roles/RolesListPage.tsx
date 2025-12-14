import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RefreshButton from '../../components/buttons/RefreshButton';
import ListGrid, { type LisGridColumn } from '../../components/ListGrid';
import SearchBox from '../../components/SearchBox';
import SelectedBadge from '../../components/SelectedBadge';
import ListView from '../../components/Views/ListView';
import { useBreadcrumbs } from '../../context/BreadcrumbsContext';
import { useListApplications } from '../../hooks/entities/useListApplications';
import { useListRoles } from '../../hooks/entities/useListRoles';
import type { Application } from '../../services/applicationService';
import { type Role } from '../../services/roleService';

export default function RolesPage() {
  const useRolesHook = useListRoles();
  const { items: applications } = useListApplications();
  const { setExtraBreadcrumbs } = useBreadcrumbs();
  const { isLoading, isFetching, refresh } = useRolesHook;

  const [selectedApplication, setSelectedApplication] = useState<Application | undefined>();
  const [fixedFilter, setFixedFilter] = useState<Record<string, string | null | undefined>>({});

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const appId: string | null = searchParams.get('appId');
    const app: Application | undefined = applications?.find((a: Application) => a.id === appId);

    setSelectedApplication(app);
    setFixedFilter({ applicationId: app?.id });

    if (app) {
      setExtraBreadcrumbs([{ label: app.name, to: `/applications?appId=${app.id}` }]);
    }

    return () => {
      setExtraBreadcrumbs([]);
    }
  }, [searchParams]);

  const columns: LisGridColumn<Role>[] = [
    { property: 'name', header: 'Role Name' },
    { property: 'applicationName', header: 'Application' },
  ];

  return (
    <ListView
      showBackButton={!!selectedApplication}
      actions={
        <SearchBox
          label="Filter by role:"
          placeholder="Search roles..."
          field="name"
        />
      }
      buttons={
        <>
          <RefreshButton
            refreshFunc={() => { refresh(); }}
            isDisabled={isLoading}
            isLoading={isFetching && !isLoading}
          />
        </>
      }
    >

      {selectedApplication && (
        <SelectedBadge
          name={selectedApplication.name}
          onClear={() => {
            setSearchParams({});
          }}
        />
      )}

      {<ListGrid
        columns={columns}
        fixedFilter={fixedFilter}
        useEntityList={useRolesHook}
      />}
    </ListView>
  );
}