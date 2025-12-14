import { useParams } from 'react-router-dom';
import EditButton from '../../components/buttons/EditButton';
import NewButton from '../../components/buttons/NewButton';
import SaveButton from '../../components/buttons/SaveButton';
import DataView from '../../components/Views/DataView';
import { useDetailsApplication } from '../../hooks/entities/applications/useDetailsApplication';
import { useValidateApplication } from '../../hooks/entities/applications/useValidateApplication';
import { saveApplication } from '../../services/applicationService';
import ApplicationsForm from './ApplicationsForm';

export default function ApplicationsDetailsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <DataView
      buttons={
        <>
          <NewButton
            isDisabled={false}
            path="/applications"
          />

          <EditButton />

          <SaveButton
            isDisabled={false}
            onSave={saveApplication}
            storeKey='applications'
            validator={useValidateApplication}
          />
        </>
      }
      entityDetails={id ? useDetailsApplication(id) : undefined}
    >
      <ApplicationsForm />
    </DataView>
  );
}