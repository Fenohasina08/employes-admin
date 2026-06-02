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
  ReferenceField,
  NullableBooleanInput,
} from "react-admin";

const InternsPagination = () => (
  <Pagination rowsPerPageOptions={[5, 10, 25]} />
);

const internsFilters = [
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
  />,

  <NullableBooleanInput 
  label="Rénuméré ?"
  source= "isRemunerate"
/>
]
export const InternsList = () => {
  return (
    <List
      filters={internsFilters}
      pagination={<InternsPagination />}
      perPage={5}
    >
      <Datagrid rowClick="show">

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

         <ReferenceField
          source="employeeId"
          reference="employees"
          label="Encadrant"
        >
          <TextField source="firstName" />{" "}
          <TextField source="lastName" />
        </ReferenceField>

        <EditButton />
        <DeleteButton />

      </Datagrid>
    </List>
  );
};