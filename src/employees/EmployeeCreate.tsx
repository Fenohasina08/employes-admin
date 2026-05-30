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
         <TextInput
          source="firstName"
          label="Prénom"
          validate={required()}
        />

         <TextInput
          source="lastName"
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
          defaultValue={1500}
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