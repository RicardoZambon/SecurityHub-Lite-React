import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBox } from '../components/SearchBox';
import { useRoles } from '../hooks/useRoles';
import { type Role } from '../services/roleService';

function RolesPage() {
  const { roles, isLoading, error } = useRoles();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();

  const appId = searchParams.get('appId');

  const filteredRoles: Role[] = roles
    .filter((role: Role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
    )
    .filter((role: Role) => (appId ? role.applicationId === appId : true));

  return (
    <section className="app-section">
      <h2>Roles</h2>

      <SearchBox
        label="Filter by role:"
        placeholder="Search roles..."
        value={searchTerm}
        onChange={setSearchTerm}
      />

      {isLoading && <p>Loading roles...</p>}
      {error && <p style={{ color: '#f97373' }}>{error}</p>}

      {!isLoading && !error && (
        <div style={{ marginTop: '1rem' }}>
          {filteredRoles.length === 0 && <p>No roles found.</p>}

          {filteredRoles.length > 0 && (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {filteredRoles.map((role: Role) => (
                <li
                  key={role.id}
                  style={{
                    marginBottom: '0.6rem',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #111827',
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{role.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                    {role.applicationName}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

export default RolesPage;
