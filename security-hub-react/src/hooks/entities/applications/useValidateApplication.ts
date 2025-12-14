import { fetchApplications, type Application } from '../../../services/applicationService';
import type { Errors } from '../../../types/errors';

export async function useValidateApplication(application: Application): Promise<Errors> {
  const applications = await fetchApplications();

  const errors: Errors = {};

  if (!application?.name || application?.name?.trim() === '') {
    errors['name'] = 'Application name is required.';
  } else if (applications?.some(a => a.name === application.name && a.id !== application.id)) {
    errors['name'] = 'An application with this name already exists.';
  }

  return Object.keys(errors).length > 0 ? errors : null;
}