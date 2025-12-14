import { fetchApplications } from '../../../services/applicationService';
import { fetchRoles, type Role } from '../../../services/roleService';
import type { Errors } from '../../../types/errors';

export async function useValidateRole(role: Role): Promise<Errors> {
  const errors: Errors = {};

  // ApplicationId
  if (!role?.applicationId || role?.applicationId?.trim() === '') {
    errors['applicationId'] = 'The application is required.';
  } else {
    const applications = await fetchApplications();

    if (!applications?.some(a => a.id === role.applicationId)) {
      errors['applicationId'] = 'Selected application does not exist.';
    }
  }

  // Name
  if (!role?.name || role?.name?.trim() === '') {
    errors['name'] = 'The name of the role is required.';
  } else {
    const roles = await fetchRoles();
    if (roles?.some(r => r.name === role.name && r.id !== role.id)) {
      errors['name'] = 'Another role with this name already exists.';
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
}