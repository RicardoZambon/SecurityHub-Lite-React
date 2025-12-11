import { useState } from 'react';
import { ApplicationsList } from '../components/ApplicationsList';
import { SearchBox } from '../components/SearchBox';
import { useApplications } from '../hooks/useApplications';
import { type Application } from '../services/applicationService';

function ApplicationsPage() {
  const { applications, isLoading, error } = useApplications();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApplications: Application[] = applications.filter((app: Application) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );

  return (
    <section className="app-section">
      <h2>Applications</h2>

      <SearchBox
        label="Filter by name:"
        placeholder="Search applications..."
        value={searchTerm}
        onChange={setSearchTerm}
      />

      {isLoading && <p>Loading applications...</p>}
      {error && <p style={{ color: '#f97373' }}>{error}</p>}

      {!isLoading && !error && <ApplicationsList applications={filteredApplications} />}
    </section>
  )
}

export default ApplicationsPage;
