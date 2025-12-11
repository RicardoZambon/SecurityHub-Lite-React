import { useEffect, useState } from 'react';
import { ApplicationsList } from '../components/ApplicationsList';
import { SearchBox } from '../components/SearchBox';
import { fetchApplications, type Application } from '../services/applicationService';

function ApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        let isMounted = true;

        async function loadApplications() {
            try {
                setIsLoading(true)
                const data: Application[] = await fetchApplications();
                if (!isMounted) return;
                setApplications(data);
                setError(null);
            } catch {
                if (!isMounted) return;
                setError('Failed to load applications.');
            } finally {
                if (!isMounted) return;
                setIsLoading(false);
            }
        }

        loadApplications();

        return () => {
            isMounted = false
        }
    }, []);

    const handleSearchChange = (newValue: string) => {
        setSearchTerm(newValue);
    };

    const filteredApplications = applications.filter((app: Application) =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
    );

    return (
        <section className="app-section">
            <h2>Applications</h2>

            <SearchBox
                label="Filter by name:"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={handleSearchChange}
            />

            {isLoading && <p>Loading applications...</p>}
            {error && <p style={{ color: '#f97373' }}>{error}</p>}

            {!isLoading && !error && (
                <ApplicationsList applications={filteredApplications} />
            )}
        </section>
    )
}

export default ApplicationsPage;
