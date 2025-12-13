import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { ListGrid, type LisGridColumn } from '../components/ListGrid';
import { PageSection } from '../components/PageSection';
import { SearchBox } from '../components/SearchBox';
import { useApplications } from '../hooks/entities/useApplications';
import { type Application } from '../services/applicationService';

function ApplicationsPage() {
  const applicationsHook = useApplications();

  const columns: LisGridColumn<Application>[] = [
    { property: 'name', header: 'Application Name' },
  ];

  return (
    <PageSection
      actions={
        <SearchBox
          label="Filter by name:"
          placeholder="Search applications..."
          value={applicationsHook.filter['name'] || ''}
          onChange={(value) => applicationsHook.setFilter('name', value)}
        />
      }
    >
      {<ListGrid
        columns={columns}
        useItems={applicationsHook}
        getLink={app => `/roles?appId=${app.id}`}
      />}
    </PageSection>
  )
}

export default ApplicationsPage;
