// src/App.tsx
import React, { useEffect, useState, type ChangeEvent } from 'react'
import { ApplicationsList } from './components/ApplicationsList';
import { fetchApplications, type Application } from './services/applicationService';

function App() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    async function loadApplications() {
      if (!isMounted) {
        return;
      }

      try {
        setIsLoading(true);
        const apps: Application[] = await fetchApplications();
        setApplications(apps);
        setError(null);
      } catch (err) {
        setError('Failed to load applications.');
      } finally {
        setIsLoading(false);
      }
    }

    loadApplications();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredApplications = applications.filter((app: Application) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Security Hub Lite</h1>
        <p>Applications, Roles & Users Dashboard</p>
      </header>

      <main className="app-main">
        <section className="app-section">
          <h2>Applications</h2>

          {/* Filter */}
          <div className="app-filter-row">
            <span className="app-filter-label">Filter by name:</span>
            <input
              className="app-filter-input"
              onChange={handleSearchChange}
              placeholder="Type an application name..."
              type="text"
              value={searchTerm}
            />
          </div>

          {isLoading && <p>Loading applications...</p>}

          {error && <p style={{ color: '#f97373' }}>{error}</p>}

          {!isLoading && !error && (
            <ApplicationsList applications={filteredApplications} />
          )}
        </section>

        <section className="app-section">
          <h2>Roles</h2>
          <p>Here we will show roles per application.</p>
        </section>

        <section className="app-section">
          <h2>Users</h2>
          <p>And here we will show users and their delegations.</p>
        </section>
      </main>
    </div>
  )
}

export default App
