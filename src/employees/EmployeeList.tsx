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
import { QuickStatusToggle } from "../components/QuickStatusToggle"; 

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
      perPage={5}   
    >
      <Datagrid rowClick="show">
        <TextField source="firstName" label="Prénom" />
        <TextField source="email" label="Email" />
        <TextField source="department" label="Département" />

        {/* Le salaire proprement formaté en EUR */}
        <NumberField
          source="salary"
          label="Salaire"
          options={{
            style: "currency",
            currency: "EUR",
          }}
        />

         <BooleanField source="active" label="Actif" />
        
         <QuickStatusToggle />

         <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};