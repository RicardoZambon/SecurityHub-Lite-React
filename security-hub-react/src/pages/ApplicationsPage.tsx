import { useState } from 'react';
import { ListGrid, type LisGridColumn } from '../components/ListGrid';
import { PageSection } from '../components/PageSection';
import { SearchBox } from '../components/SearchBox';
import { useApplications } from '../hooks/useApplications';
import { type Application } from '../services/applicationService';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';

function ApplicationsPage() {
  const { applications, isLoading, error } = useApplications();
  const [searchTerm, setSearchTerm] = useState('');

  const columns: LisGridColumn<Application>[] = [
    { property: 'name', header: 'Application Name' },
  ];

  const filteredApplications: Application[] = applications.filter((app: Application) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );

  return (
    <PageSection
      title="Applications"
      breadcrumbs={useBreadcrumbs()}
      actions={
        <SearchBox
          label="Filter by name:"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      }
    >
      {isLoading && <p>Loading applications...</p>}
      {error && <p style={{ color: '#f97373' }}>{error}</p>}

      {!isLoading && !error && <ListGrid
        columns={columns}
        items={filteredApplications}
        getLink={app => `/roles?appId=${app.id}`}
      />}
    </PageSection>
  )
}

export default ApplicationsPage;
