import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListGrid } from '../components/ListGrid';
import { PageSection } from '../components/PageSection';
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
    <PageSection
      title="Roles"
      actions={
        <SearchBox
          label="Filter by role:"
          placeholder="Search roles..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      }>
      {isLoading && <p>Loading roles...</p>}
      {error && <p style={{ color: '#f97373' }}>{error}</p>}

      {!isLoading && !error && <ListGrid
        items={filteredRoles}
        renderItem={(role: Role) => (
          <>
            <div style={{ fontWeight: 600 }}>{role.name}</div>
            <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
              {role.applicationName}
            </div>
          </>
        )}
      />}
    </PageSection>
  );
}

export default RolesPage;
