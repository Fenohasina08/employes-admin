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

/*
|--------------------------------------------------------------------------
| Composant EmployeeTitle
|--------------------------------------------------------------------------
|
| Ce composant sert à afficher un titre dynamique dans la page Edit.
|
| Exemple :
| Modifier : Alice Martin
|
| useRecordContext() permet de récupérer automatiquement
| l'employé actuellement chargé par React-Admin.
|
*/

const EmployeeTitle = () => {
  // record contient les données de l'employé courant
  const record = useRecordContext();

  /*
  |--------------------------------------------------------------------------
  | Pourquoi utiliser ?.
  |--------------------------------------------------------------------------
  |
  | Au premier rendu :
  | record peut être undefined pendant le chargement des données.
  |
  | Sans ? :
  | ❌ record.firstname → crash
  |
  | Avec ? :
  | ✅ React attend que les données arrivent.
  |
  */

  return (
    <span>
      Modifier : {record?.firstname} {record?.lastname}
    </span>
  );
};

/*
|--------------------------------------------------------------------------
| Composant principal EmployeeEdit
|--------------------------------------------------------------------------
|
| Ce composant représente la page de modification d’un employé.
|
| React-Admin :
| - récupère automatiquement l’employé via l’URL
| - remplit les champs automatiquement
| - envoie la requête PUT/PATCH automatiquement
|
| Exemple :
| GET /employees/1
| PUT /employees/1
|
*/

export const EmployeeEdit = () => {
  return (
    /*
    |--------------------------------------------------------------------------
    | Composant Edit
    |--------------------------------------------------------------------------
    |
    | title={<EmployeeTitle />}
    |
    | Permet d'utiliser notre composant de titre personnalisé.
    |
    */

    <Edit title={<EmployeeTitle />}>

      {/*
      |--------------------------------------------------------------------------
      | SimpleForm
      |--------------------------------------------------------------------------
      |
      | Génère automatiquement :
      | - le formulaire
      | - le bouton Save
      | - la gestion des validations
      | - la soumission du formulaire
      |
      */}

      <SimpleForm>

        {/*
        |--------------------------------------------------------------------------
        | Champ Prénom
        |--------------------------------------------------------------------------
        |
        | source :
        | correspond à la clé dans le JSON/API
        |
        | validate={required()}
        | rend le champ obligatoire
        |
        */}

        <TextInput
          source="firstname"
          label="Prénom"
          validate={required()}
          fullWidth
        />

        {/*
        |--------------------------------------------------------------------------
        | Champ Nom
        |--------------------------------------------------------------------------
        */}

        <TextInput
          source="lastname"
          label="Nom"
          validate={required()}
          fullWidth
        />

        {/*
        |--------------------------------------------------------------------------
        | Champ Email
        |--------------------------------------------------------------------------
        |
        | TextInput est utilisé car un email reste une chaîne de caractères.
        |
        */}

        <TextInput
          source="email"
          label="Email"
          validate={required()}
          fullWidth
        />

        {/*
        |--------------------------------------------------------------------------
        | Champ Département
        |--------------------------------------------------------------------------
        |
        | SelectInput crée une liste déroulante.
        |
        | choices :
        | définit les choix disponibles.
        |
        | id :
        | valeur réellement enregistrée.
        |
        | name :
        | texte affiché à l'utilisateur.
        |
        */}

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

        {/*
        |--------------------------------------------------------------------------
        | Champ Salaire
        |--------------------------------------------------------------------------
        |
        | NumberInput :
        | accepte uniquement des nombres.
        |
        | minValue(1500) :
        | interdit les valeurs inférieures à 1500.
        |
        | validate={[...]} :
        | plusieurs validations en même temps.
        |
        */}

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