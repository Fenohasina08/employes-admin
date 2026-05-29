import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  BooleanInput,
  required,
  minValue,
} from "react-admin";

export const EmployeeCreate = () => {
  return (
    <Create redirect="list">
      <SimpleForm>
        {/* Prénom */}
        <TextInput
          source="firstname"
          label="Prénom"
          validate={required()}
        />

        {/* Nom */}
        <TextInput
          source="lastname"
          label="Nom"
          validate={required()}
        />

        {/* Email */}
        <TextInput
          source="email"
          label="Email"
          validate={required()}
        />

        {/* Département */}
        <SelectInput
          source="department"
          label="Département"
          choices={[
            { id: "Informatique", name: "Informatique" },
            { id: "Marketing", name: "Marketing" },
            { id: "RH", name: "RH" },
          ]}
          validate={required()}
        />

        {/* Salaire */}
        <NumberInput
          source="salary"
          label="Salaire"
          validate={[required(), minValue(1500)]}
        />

        {/* Actif */}
        <BooleanInput
          source="active"
          label="Actif"
          defaultValue={true}
        />
      </SimpleForm>
    </Create>
  );
};