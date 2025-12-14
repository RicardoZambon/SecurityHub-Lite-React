import { ListGrid, type LisGridColumn } from '../../components/ListGrids/ListGrid';
import { PageSection } from '../../components/PageSection';
import { SearchBox } from '../../components/SearchBox';
import { usePage } from '../../context/PageContext';
import { useListApplications } from '../../hooks/entities/useListApplications';
import { type Application } from '../../services/applicationService';
import { ViewRolesButton } from './customButtons/ViewRolesButton';

function ApplicationsPage() {
  const { filter, setFilter } = usePage();

  const columns: LisGridColumn<Application>[] = [
    { property: 'name', header: 'Application Name' },
  ];

  return (
    <PageSection
      actions={
        <SearchBox
          label="Filter by name:"
          placeholder="Search applications..."
          value={filter['name'] || ''}
          onChange={(value) => setFilter('name', value)}
        />
      }
    >
      {<ListGrid
        columns={columns}
        customButtons={<ViewRolesButton />}
        gridUniqueKey="applications-list-grid"
        useEntityList={useListApplications()}
      />}
    </PageSection>
  )
}

export default ApplicationsPage;
