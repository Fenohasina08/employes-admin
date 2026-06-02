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
import { InternFromInputs } from "./InternsCreate";

const InternsTitle = () => {
  const record = useRecordContext();

  return (
    <span>
      Modifier : {record?.firstName} {record?.lastName}
    </span>
  );
};

 

export const InternsEdit = () => {
  return (
    <Edit title={<InternsTitle />}>
      <SimpleForm>

        <TextInput
          source="firstName"
          label="Prénom"
          validate={required("Prénom obligatoire")}
          fullWidth
        />

        <TextInput
          source="lastName"
          label="Nom"
          validate={required("Nom obligatoire")}
          fullWidth
        />

        <TextInput
          source="email"
          label="Email"
          validate={required("Email obligatoire")}
          fullWidth
        />

        <SelectInput
          source="department"
          label="Département"
          choices={[
            { id: "Informatique", name: "Informatique" },
            { id: "Marketing", name: "Marketing" },
            { id: "RH", name: "RH" },
          ]}
          validate={required("Département obligatoire")}
          fullWidth
        />

        <NumberInput
          source="salary"
          label="Salaire"
          validate={[
            required("Salaire obligatoire"),
            minValue(1500, "Salaire minimum 1500"),
          ]}
          fullWidth
        />

        <BooleanInput
          source="active"
          label="Actif"
        />

         <SelectInput
          source="employeeId"
          label="Encadrant"
          choices={[
            { id: 1, name: "Alice Martin" },
            { id: 2, name: "Bob Dupont" },
            { id: 3, name: "Clara Nguyen" },
          ]}
          validate={required("Encadrant obligatoire")}
          fullWidth
        />
        <InternFromInputs />
      </SimpleForm>
    </Edit>
  );
};