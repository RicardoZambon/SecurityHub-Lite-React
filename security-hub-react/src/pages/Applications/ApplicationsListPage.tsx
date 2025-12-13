import { ListGrid, type LisGridColumn } from '../../components/ListGrid';
import { PageSection } from '../../components/PageSection';
import { SearchBox } from '../../components/SearchBox';
import { useListApplications } from '../../hooks/entities/useListApplications';
import { type Application } from '../../services/applicationService';
import { ViewRolesButton } from './customButtons/ViewRolesButton';

function ApplicationsPage() {
  const applicationsListHook = useListApplications();

  const columns: LisGridColumn<Application>[] = [
    { property: 'name', header: 'Application Name' },
  ];

  return (
    <PageSection
      actions={
        <SearchBox
          label="Filter by name:"
          placeholder="Search applications..."
          value={applicationsListHook.filter['name'] || ''}
          onChange={(value) => applicationsListHook.setFilter('name', value)}
        />
      }
    >
      {<ListGrid
        columns={columns}
        customButtons={<ViewRolesButton />}
        useEntityList={applicationsListHook}
      />}
    </PageSection>
  )
}

export default ApplicationsPage;
