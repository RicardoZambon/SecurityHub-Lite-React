import { useParams } from 'react-router-dom';
import EditButton from '../../components/buttons/EditButton';
import NewButton from '../../components/buttons/NewButton';
import SaveButton from '../../components/buttons/SaveButton';
import DataView from '../../components/Views/DataView';
import { useDetailsUser } from '../../hooks/entities/users/useDetailsUser';
import { useValidateUser } from '../../hooks/entities/users/useValidateUser';
import { saveUser } from '../../services/userService';
import UsersForm from './UsersForm';

export default function UsersDetailsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <DataView
      buttons={
        <>
          <NewButton path="/users" />

          <EditButton />

          <SaveButton
            onSave={saveUser}
            storeKey='users'
            validator={useValidateUser}
          />
        </>
      }
      entityDetails={id ? useDetailsUser(id) : undefined}
    >
      <UsersForm />
    </DataView>
  );
}