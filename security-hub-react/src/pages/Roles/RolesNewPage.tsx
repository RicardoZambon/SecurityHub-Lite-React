import EditButton from '../../components/buttons/EditButton';
import NewButton from '../../components/buttons/NewButton';
import SaveButton from '../../components/buttons/SaveButton';
import DataView from '../../components/Views/DataView';
import { useValidateRole } from '../../hooks/entities/roles/useValidateRole';
import { saveRole } from '../../services/roleService';
import RolesForm from './RolesForm';

export default function RolesNewPage() {
  return (
    <DataView
      buttons={
        <>
          <NewButton
            isDisabled={false}
            path="/roles"
          />

          <EditButton />

          <SaveButton
            isDisabled={false}
            onSave={saveRole}
            storeKey='roles'
            validator={useValidateRole}
          />
        </>
      }
    >
      <RolesForm />
    </DataView>
  );
}