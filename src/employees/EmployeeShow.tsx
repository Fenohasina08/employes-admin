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
// 1. Importation corrigée avec les accolades et le "s"
import { InternsByManager } from "../interns/InternsByManager"; 

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
        
        {/* 2. Balise corrigée avec le "s" */}
        <InternsByManager />
        
      </SimpleShowLayout>
    </Show>
  );
};