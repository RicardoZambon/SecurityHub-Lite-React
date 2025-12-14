import { fetchApplications } from '../../../services/applicationService';
import { fetchRoles, type Role } from '../../../services/roleService';
import type { Errors } from '../../../types/errors';

export async function useValidateRole(role: Role): Promise<Errors> {
  const roles = await fetchRoles();
  const applications = await fetchApplications();

  const errors: Errors = {};

  if (!role?.name || role?.name?.trim() === '') {
    errors['name'] = 'Role name is required.';
  } else if (roles?.some(r => r.name === role.name && r.id !== role.id)) {
    errors['name'] = 'A role with this name already exists.';
  }

  if (!role?.applicationId || role?.applicationId?.trim() === '') {
    errors['applicationId'] = 'Application is required.';
  } else if (!applications?.some(a => a.id === role.applicationId)) {
    errors['applicationId'] = 'Selected application does not exist.';
  }

  return Object.keys(errors).length > 0 ? errors : null;
}