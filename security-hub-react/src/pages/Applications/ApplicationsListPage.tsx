import NewButton from '../../components/ListGrids/buttons/NewButton';
import RefreshButton from '../../components/ListGrids/buttons/RefreshButton';
import ListGrid, { type LisGridColumn } from '../../components/ListGrids/ListGrid';
import SearchBox from '../../components/SearchBox';
import ListView from '../../components/Views/ListView';
import { useListApplications } from '../../hooks/entities/useListApplications';
import { type Application } from '../../services/applicationService';
import { ViewRolesButton } from './customButtons/ViewRolesButton';

export default function ApplicationListPage() {
  const useApplicationsHook = useListApplications();
  const { isLoading, isFetching, refresh } = useApplicationsHook;

  const columns: LisGridColumn<Application>[] = [
    { property: 'name', header: 'Application Name' },
  ];

  return (
    <ListView
      actions={
        <SearchBox
          label="Filter by name:"
          placeholder="Search applications..."
          field="name"
        />
      }
      buttons={
        <>
          <NewButton
            isDisabled={isLoading}
          />

          <RefreshButton
            refreshFunc={() => { refresh(); }}
            isDisabled={isLoading}
            isLoading={isFetching && !isLoading}
          />

          <ViewRolesButton />
        </>
      }
    >
      <ListGrid
        columns={columns}
        useEntityList={useApplicationsHook}
      />
    </ListView>
  )
}
