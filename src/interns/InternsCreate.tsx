import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  ReferenceInput,
  NumberInput,
  BooleanInput,
  required,
  minValue,
  email,
} from "react-admin";
import { useWatch } from "react-hook-form";

export const InternFormInputs = () => {
  const isRemunerate = useWatch({ name: "isRemunerate" });
  const department = useWatch({ name: "department" });

  return (
    <>
      <TextInput source="firstName" label="Prénom" validate={required("Prénom obligatoire")} />
      <TextInput source="lastName" label="Nom" validate={required("Nom obligatoire")} />
      <TextInput
        source="email"
        label="Email"
        validate={[required("Email obligatoire"), email("Email invalide")]}
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

      <BooleanInput
        source="isRemunerate"
        label="Stagiaire rémunéré"
        defaultValue={false}
      />

      {isRemunerate && (
        <NumberInput
          source="remuneration"
          label="Rémunération"
          validate={[
            required("Rémunération obligatoire"),
            minValue(0, "La rémunération doit être positive"),
          ]}
        />
      )}

      <ReferenceInput
        source="employeeId"
        reference="employees"
        filter={{
          active: true,
          department: department ? department : undefined,
        }}
      >
        <SelectInput
          label="Encadrant"
          optionText={(record) => `${record.firstName} ${record.lastName}`}
          validate={required("Encadrant obligatoire")}
        />
      </ReferenceInput>

      <BooleanInput source="active" label="Actif" defaultValue={true} />
    </>
  );
};

export const InternsCreate = () => {
  return (
    <Create redirect="list">
      <SimpleForm>
        <InternFormInputs />
      </SimpleForm>
    </Create>
  );
};