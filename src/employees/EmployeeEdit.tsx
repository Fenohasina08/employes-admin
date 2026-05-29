import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  BooleanInput,
  required,
  minValue,
  useRecordContext,
} from "react-admin";

export const EmployeeEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <Edit title={<EmployeeTitle />}></Edit>
      </SimpleForm>
    </Edit>
  );
};