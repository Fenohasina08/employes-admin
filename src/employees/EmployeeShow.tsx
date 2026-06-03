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
import ManagerCard from "../components/ManagerCard";

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
        <ManagerCard />
      </SimpleShowLayout>
    </Show>
  );
};