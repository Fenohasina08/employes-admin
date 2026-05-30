import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  BooleanInput,
  required,
  minValue,
  useRecordContext,
} from "react-admin";

 

const EmployeeTitle = () => {
   const record = useRecordContext();

   

  return (
    <span>
      Modifier : {record?.firstname} {record?.lastname}
    </span>
  );
};

 

export const EmployeeEdit = () => {
  return (
     

    <Edit title={<EmployeeTitle />}>

      

      <SimpleForm>

        

        <TextInput
          source="firstname"
          label="Prénom"
          validate={required()}
          fullWidth
        />

         

        <TextInput
          source="lastname"
          label="Nom"
          validate={required()}
          fullWidth
        />

         

        <TextInput
          source="email"
          label="Email"
          validate={required()}
          fullWidth
        />

         

        <SelectInput
          source="department"
          label="Département"
          choices={[
            {
              id: "Informatique",
              name: "Informatique",
            },
            {
              id: "Marketing",
              name: "Marketing",
            },
            {
              id: "RH",
              name: "RH",
            },
          ]}
          validate={required()}
          fullWidth
        />

        
        <NumberInput
          source="salary"
          label="Salaire"
          validate={[
            required(),
            minValue(1500),
          ]}
          fullWidth
        />

         

        <BooleanInput
          source="active"
          label="Actif"
        />

      </SimpleForm>
    </Edit>
  );
};