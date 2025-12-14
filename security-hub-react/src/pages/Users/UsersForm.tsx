import FormRegion from '../../components/form/FormRegion';
import Input from '../../components/form/Input';

export default function RolesForm() {
  return (
    <>
      <FormRegion title="User Details">
        <Input formControlName="name" label="Name" />
        <Input formControlName="email" label="Email" />
        <Input formControlName="department" label="Department" />
        <Input formControlName="jobFunction" label="JobFunction" />
      </FormRegion>
    </>
  );
}