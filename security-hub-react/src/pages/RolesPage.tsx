import { useEffect, useState } from 'react';
import { SearchBox } from '../components/SearchBox';
import { fetchRoles, type Role } from '../services/roleService';
import { useSearchParams } from 'react-router-dom';

// type Role = {
//     id: string,
//     name: string,
//     applicationName: string,
// }

// const MOCK_ROLES: Role[] = [
//     { id: '1', name: 'Admin', applicationName: 'Security Hub' },
//     { id: '2', name: 'Viewer', applicationName: 'Security Hub' },
//     { id: '3', name: 'Student', applicationName: 'Portal Alunos' },
//     { id: '4', name: 'Instructor', applicationName: 'Portal Alunos' },
//     { id: '5', name: 'Billing Manager', applicationName: 'Zilia ERP' },
// ];

function RolesPage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);

    const [searchParams] = useSearchParams();
    const appId = searchParams.get('appId');

    useEffect(() => {
        let isMounted: boolean = true;

        async function loadRoles() {
            try {
                setIsLoading(true);
                const data: Role[] = await fetchRoles();
                if (!isMounted) return;
                setRoles(data);
                setError(null);
            } catch {
                if (!isMounted) return;
                setError('Failed to load roles.');
            } finally {
                if (!isMounted) return;
                setIsLoading(false);
            }
        }

        loadRoles();

        return () => {
            isMounted = false;
        };
    }, []);

    const filteredBySearch: Role[] = roles.filter((role: Role) =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
    );

    const finalRoles: Role[] = appId
        ? filteredBySearch.filter((role: Role) => role.applicationId === appId)
        : filteredBySearch;

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
                    {finalRoles.length === 0 && <p>No roles found.</p>}
    
                    {finalRoles.length > 0 && (
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                            {finalRoles.map((role: Role) => (
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
