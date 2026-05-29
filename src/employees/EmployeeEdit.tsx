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

const EmployeeTitle = () => {
  const record = useRecordContext();

  return (
    <span>
      Modifier : {record?.firstname} {record?.lastname}
    </span>
  );
};