import FormRegion from '../../components/form/FormRegion';
import Input from '../../components/form/Input';

export default function ApplicationsForm() {
  return (
    <>
      <FormRegion title="Application Details">
        <Input formControlName="name" label="Name" />
      </FormRegion>
    </>
  );
}