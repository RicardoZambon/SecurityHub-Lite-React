import { useState } from 'react';
import { ListGrid } from '../components/ListGrid';
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

      {!isLoading && !error && <ListGrid
        items={filteredApplications}
        renderItem={(app: Application) => (
          <>
            <div style={{ fontWeight: 600 }}>{app.name}</div>
          </>
        )}
      />}
    </section>
  )
}

export default ApplicationsPage;
