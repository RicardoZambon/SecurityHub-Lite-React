import { fetchUsers, type User } from '../../../services/userService';
import type { Errors } from '../../../types/errors';

export async function useValidateUser(user: User): Promise<Errors> {
  const errors: Errors = {};

  // Department
  if (!user?.department || user?.department?.trim() === '') {
    errors['department'] = 'The department field is required.';
  }

  // Email
  if (!user?.email || user?.email?.trim() === '') {
    errors['email'] = 'The email field is required.';
  } else if (user.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors['email'] = 'The email address is not valid.';
  }

  // Job Function
  if (!user?.jobFunction || user?.jobFunction?.trim() === '') {
    errors['jobFunction'] = 'The job function field is required.';
  }

  // Name
  if (!user?.name || user?.name?.trim() === '') {
    errors['name'] = 'The name of the user is required.';
  } else {
    const users = await fetchUsers();
    if (users?.some(r => r.name === user.name && r.id !== user.id)) {
      errors['name'] = 'Another user with this name already exists.';
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
}