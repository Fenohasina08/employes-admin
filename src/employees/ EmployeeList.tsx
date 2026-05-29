import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  TextInput,
  SelectInput,
} from "react-admin";

// 🔍 Barre de recherche (alwaysOn)
const employeeFilters = [
  TextInput({
    label: "Recherche",
    source: "q",
    alwaysOn: true,
  }),

  // 🎯 Filtre par département
  SelectInput({
    label: "Département",
    source: "department",
    choices: [
      { id: "Informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
    ],
  }),
];

export const EmployeeList = () => {
  return (
    <List filters={employeeFilters}>
      <Datagrid rowClick="edit">

        {/* Prénom + Nom (si séparés dans ton API) */}
        <TextField source="firstname" label="Prénom" />
        <TextField source="lastname" label="Nom" />

        {/* Email */}
        <TextField source="email" />

        {/* Département */}
        <TextField source="department" label="Département" />

        {/* Salaire en € */}
        <NumberField
          source="salary"
          options={{
            style: "currency",
            currency: "EUR",
          }}
        />

        {/* Actif */}
        <BooleanField source="active" />

      </Datagrid>
    </List>
  );
};