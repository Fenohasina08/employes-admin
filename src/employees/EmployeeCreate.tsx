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
          source="Prénom"
          label="Prénom"
          validate={required()}
        />

        {/* Nom */}
        <TextInput
          source="Nom"
          label="Nom"
          validate={required()}
        />

        {/* Email */}
        <TextInput
          source="Email"
          label="Email"
          validate={required()}
        />

        {/* Département */}
        <SelectInput
          source="Département"
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
          source="Salaire"
          label="Salaire"
          validate={[required(), minValue(1500)]}
        />

        {/* Actif */}
        <BooleanInput
          source="Actif"
          label="Actif"
          defaultValue={true}
        />
      </SimpleForm>
    </Create>
  );
};