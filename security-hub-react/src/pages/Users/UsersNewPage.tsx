import EditButton from '../../components/buttons/EditButton';
import NewButton from '../../components/buttons/NewButton';
import SaveButton from '../../components/buttons/SaveButton';
import DataView from '../../components/Views/DataView';
import { useValidateUser } from '../../hooks/entities/users/useValidateUser';
import { saveUser } from '../../services/userService';
import UsersForm from './UsersForm';

export default function UsersNewPage() {
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
    >
      <UsersForm />
    </DataView>
  );
}