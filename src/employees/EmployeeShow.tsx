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

      {/* Retour vers la liste */}
      <ListButton />

      {/* Aller vers la page Edit */}
      <EditButton />

    </TopToolbar>
  );
};

export const EmployeeShow = () => {
  return (
    <Show actions={<EmployeeShowActions />}>

    </Show>
  );
};