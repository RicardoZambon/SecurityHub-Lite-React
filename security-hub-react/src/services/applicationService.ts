export type Application = {
    id: string;
    name: string;
}

const MOCK_APPLICATIONS: Application[] = [
    { id: '1', name: 'App One' },
    { id: '2', name: 'App Two' },
    { id: '3', name: 'App Three' },
];

export function fetchApplications(): Promise<Application[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_APPLICATIONS);
        }, 1200); // Simulate network delay
    });
}

export function getApplicationById(id: string): Promise<Application | undefined> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const app = MOCK_APPLICATIONS.find(application => application.id === id);
            resolve(app);
        }, 1200); // Simulate network delay
    });
}