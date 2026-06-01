import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  TopToolbar,
  ListButton,
  EditButton,
  ReferenceField,
} from "react-admin";

const InternsShowActions = () => {
  return (
    <TopToolbar>
      <ListButton />
      <EditButton />
    </TopToolbar>
  );
};

export const InternsShow = () => {
  return (
    <Show actions={<InternsShowActions />}>
      <SimpleShowLayout>

        <TextField source="firstName" label="Prénom" />
        <TextField source="lastName" label="Nom" />

        <TextField source="email" label="Email" />

        <TextField source="department" label="Département" />

        <NumberField
          source="salary"
          label="Salaire"
          options={{
            style: "currency",
            currency: "EUR",
          }}
        />

        <BooleanField source="active" label="Actif" />

        {/* 🔥 Encadrant (relation avec employees) */}
        <ReferenceField
          source="employeeId"
          reference="employees"
          label="Encadrant"
        >
          <TextField source="firstName" />{" "}
          <TextField source="lastName" />
        </ReferenceField>

      </SimpleShowLayout>
    </Show>
  );
};