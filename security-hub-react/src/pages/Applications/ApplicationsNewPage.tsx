import EditButton from '../../components/buttons/EditButton';
import NewButton from '../../components/buttons/NewButton';
import SaveButton from '../../components/buttons/SaveButton';
import DataView from '../../components/Views/DataView';
import { useValidateApplication } from '../../hooks/entities/applications/useValidateApplication';
import { saveApplication } from '../../services/applicationService';
import ApplicationsForm from './ApplicationsForm';

export default function ApplicationsNewPage() {
  return (
    <DataView
      buttons={
        <>
          <NewButton path="/applications" />

          <EditButton />

          <SaveButton
            onSave={saveApplication}
            storeKey='applications'
            validator={useValidateApplication}
          />
        </>
      }
    >
      <ApplicationsForm />
    </DataView>
  );
}