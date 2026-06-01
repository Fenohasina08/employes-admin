import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  TopToolbar,
  ListButton,
  EditButton,
} from "react-admin";

const EmployeeShowActions = () => {
  return (
    <TopToolbar>
      <ListButton />
      <EditButton />
    </TopToolbar>
  );
};

export const EmployeeShow = () => {
  return (
    <Show actions={<EmployeeShowActions />}>
      <SimpleShowLayout>

        <TextField
          source="firstname"
          label="Prénom"
        />

        <TextField
          source="lastname"
          label="Nom"
        />

        <TextField source="email" />

        <TextField
          source="department"
          label="Département"
        />

        <NumberField
          source="salary"
          options={{
            style: "currency",
            currency: "EUR",
          }}
        />

        <BooleanField source="active" />

      </SimpleShowLayout>
    </Show>
  );
};