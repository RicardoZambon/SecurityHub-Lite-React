export type Role = {
  id: string,
  name: string,
  applicationId: string,
  applicationName: string,
}

const MOCK_ROLES: Role[] = [
  { id: '1', name: 'Admin', applicationId: '1', applicationName: 'App One' },
  { id: '2', name: 'Viewer', applicationId: '1', applicationName: 'App One' },

  { id: '3', name: 'Student', applicationId: '2', applicationName: 'App Two' },
  { id: '4', name: 'Instructor', applicationId: '2', applicationName: 'App Two' },

  { id: '5', name: 'Billing Manager', applicationId: '3', applicationName: 'App Three' },
];

export function fetchRoles(): Promise<Role[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(MOCK_ROLES);
    }, Math.random() * 2000);
  });
}
