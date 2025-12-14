import { useParams } from 'react-router-dom';
import EditButton from '../../components/buttons/EditButton';
import NewButton from '../../components/buttons/NewButton';
import SaveButton from '../../components/buttons/SaveButton';
import DataView from '../../components/Views/DataView';
import { useDetailsRole } from '../../hooks/entities/roles/useDetailsRole';
import { useValidateRole } from '../../hooks/entities/roles/useValidateRole';
import { saveRole } from '../../services/roleService';
import RolesForm from './RolesForm';

export default function RolesDetailsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <DataView
      buttons={
        <>
          <NewButton path="/roles" />

          <EditButton />

          <SaveButton
            onSave={saveRole}
            storeKey='roles'
            validator={useValidateRole}
          />
        </>
      }
      entityDetails={id ? useDetailsRole(id) : undefined}
    >
      <RolesForm />
    </DataView>
  );
}