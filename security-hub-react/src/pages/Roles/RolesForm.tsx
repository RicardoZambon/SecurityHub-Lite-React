import FormRegion from '../../components/form/FormRegion';
import Input from '../../components/form/Input';
import Select from '../../components/form/Select';
import { useListApplications } from '../../hooks/entities/applications/useListApplications';

export default function RolesForm() {
  const { items: applications } = useListApplications();

  return (
    <>
      <FormRegion title="Role Details">
        <Select
          displayControlName="applicationName"
          formControlName="applicationId"
          label="Application"
          options={applications?.map(a => { return { value: a.id || '', label: a.name || '' } }) ?? []}
        />

        <Input formControlName="name" label="Name" />
      </FormRegion>
    </>
  );
}