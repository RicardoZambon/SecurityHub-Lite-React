import { useState } from 'react';
import { SearchBox } from '../components/SearchBox';

type Role = {
    id: string,
    name: string,
    applicationName: string,
}

const MOCK_ROLES: Role[] = [
    { id: '1', name: 'Admin', applicationName: 'Security Hub' },
    { id: '2', name: 'Viewer', applicationName: 'Security Hub' },
    { id: '3', name: 'Student', applicationName: 'Portal Alunos' },
    { id: '4', name: 'Instructor', applicationName: 'Portal Alunos' },
    { id: '5', name: 'Billing Manager', applicationName: 'Zilia ERP' },
];

function RolesPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRoles = MOCK_ROLES.filter((role: Role) =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
    );

    return (
        <section className="app-section">
            <h2>Roles</h2>

            <SearchBox
                label="Filter by role:"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={setSearchTerm}
            />

            <div style={{ marginTop: '1rem' }}>
                {filteredRoles.length === 0 && <p>No roles found.</p>}

                {filteredRoles.length > 0 && (
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {filteredRoles.map(role => (
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
        </section>
    )
}

export default RolesPage;
