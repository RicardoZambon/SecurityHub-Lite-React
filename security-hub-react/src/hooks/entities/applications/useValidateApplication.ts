import { fetchApplications, type Application } from '../../../services/applicationService';
import type { Errors } from '../../../types/errors';

export async function useValidateApplication(application: Application): Promise<Errors> {
  const errors: Errors = {};

  // Name
  if (!application?.name || application?.name?.trim() === '') {
    errors['name'] = 'The name of the application is required.';
  } else {
    const applications = await fetchApplications();
    if (applications?.some(a => a.name === application.name && a.id !== application.id)) {
      errors['name'] = 'Another application with this name already exists.';
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
}