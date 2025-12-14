export type Role = {
  id: string,
  name: string,
  applicationId: string,
  applicationName: string,
}

export function fetchRoles(): Promise<Role[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(readRoles().sort((a, b) => a.name.localeCompare(b.name)));
    }, Math.random() * 2000);
  });
}

export function getRoleById(id: string): Promise<Role | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(readRoles().find(role => role.id === id));
    }, Math.random() * 2000);
  });
}

export function saveRole(role: Role): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const roleId: string = role.id || (readRoles().length + 1).toString();

      const roles = readRoles();
      if (role.id) {
        // Update existing role
        const index = roles.findIndex(r => r.id === role.id);
        if (index !== -1) {
          roles[index] = role;
        } else {
          // Role not found, something went wrong.
          throw new Error(`Role with id ${role.id} not found`);
        }
      } else {
        // Create new role
        roles.push({ ...role, id: roleId });
      }

      localStorage.setItem("roles", JSON.stringify(roles));
      resolve(roleId);

    }, Math.random() * 2000);
  });
}

// Utility function to read roles from localStorage.
function readRoles(): Role[] {
  let roles = [];
  const data: string | null = localStorage.getItem("roles");
  if (data) {
    try {
      roles = JSON.parse(data);
    }
    catch (e) {
      console.error("Error parsing roles from localStorage", e);
    }
  }

  if (roles.length === 0) {
    roles = [
      { id: '1', name: 'Admin', applicationId: '1', applicationName: 'App One' },
      { id: '2', name: 'Viewer', applicationId: '1', applicationName: 'App One' },

      { id: '3', name: 'Student', applicationId: '2', applicationName: 'App Two' },
      { id: '4', name: 'Instructor', applicationId: '2', applicationName: 'App Two' },

      { id: '5', name: 'Billing Manager', applicationId: '3', applicationName: 'App Three' },
    ];
  }

  return roles;
}