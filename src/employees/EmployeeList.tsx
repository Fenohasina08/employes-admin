import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  TextInput,
  SelectInput,
  Pagination,
  EditButton,
  DeleteButton,
} from "react-admin";

 const EmployeePagination = () => <Pagination rowsPerPageOptions={[5, 10, 25]} />;

const employeeFilters = [
  <TextInput
    label="Recherche"
    source="q"
    alwaysOn
  />,

  <SelectInput
    label="Département"
    source="department"
    choices={[
      { id: "Informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
    ]}
  />
];

export const EmployeeList = () => {
  return (
     <List
      filters={employeeFilters}
      pagination={<EmployeePagination />}
      perPage={5}   // ⭐ clé principale
    >
      <Datagrid rowClick="show">

        <TextField source="Prénom" />
        <TextField source="Email" />
        <TextField source="Département" />
        <TextField source="Salaire" />
        <TextField source="Actif" />

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
            <EditButton />
            <DeleteButton />
      </Datagrid>
    </List>
  );
};

