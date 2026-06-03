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
          source="remuneration"
          label="Salaire"
          options={{
            style: "currency",
            currency: "EUR",
          }}
        />

        <BooleanField source="active" label="Actif" />

         <ReferenceField
          source="employeeId"
          reference="employees"
          label="Encadrant"
          link="show"
        >
          <TextField source="firstName" />{" "}
          <TextField source="lastName" />
        </ReferenceField>

      </SimpleShowLayout>
    </Show>
  );
};