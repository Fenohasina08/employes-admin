import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  BooleanInput,
  required,
  minValue,
  email,
} from "react-admin";

export const InternsCreate = () => {
  return (
    <Create redirect="list">
      <SimpleForm>

        <TextInput
          source="firstName"
          label="Prénom"
          validate={required("Prénom obligatoire")}
        />

        <TextInput
          source="lastName"
          label="Nom"
          validate={required("Nom obligatoire")}
        />

        <TextInput
          source="email"
          label="Email"
          validate={[
            required("Email obligatoire"),
            email("Email invalide"),
          ]}
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
        />

        <NumberInput
          source="salary"
          label="Salaire"
          defaultValue={1500}
          min={1500}
          validate={[
            required("Salaire obligatoire"),
            minValue(1500, "Salaire minimum 1500"),
          ]}
        />

        <BooleanInput
          source="active"
          label="Actif"
          defaultValue={true}
        />

        {/* 🔥 LIEN AVEC L’ENCADRANT */}
        <SelectInput
          source="employeeId"
          label="Encadrant"
          choices={[
            { id: 1, name: "Alice Martin" },
            { id: 2, name: "Bob Dupont" },
            { id: 3, name: "Clara Nguyen" },
          ]}
          validate={required("Encadrant obligatoire")}
        />

      </SimpleForm>
    </Create>
  );
};