# REPONSES.md — Exercice React-Admin CRUD

---

## Exercice 1 — Configuration de l'application

### Question 1.1 : Que représente le dataProvider dans React-Admin ? Quel est son rôle ?

Le dataProvider c'est en gros le "traducteur" entre React-Admin et notre API.
React-Admin ne sait pas comment parler à notre API tout seul, donc le dataProvider fait le lien.
Par exemple quand on veut afficher la liste des employés, React-Admin appelle `dataProvider.getList("employees", ...)` et c'est le dataProvider qui va faire la vraie requête HTTP GET vers `http://localhost:3002/employees`.

En résumé il traduit les actions de React-Admin (getList, getOne, create, update, delete) en vraies requêtes HTTP vers notre API.

### Question 1.2 : Quelle requête HTTP est envoyée au chargement de la liste ?

En ouvrant l'onglet Network du navigateur, on voit une requête GET envoyée vers :
```
GET http://localhost:3002/employees?_end=10&_order=ASC&_sort=Email&_start=0
```
C'est une requête GET avec des paramètres de tri et de pagination ajoutés automatiquement par `ra-data-json-server`.

---

## Exercice 2 — Liste des employés

### Question 2.1 : Que fait la prop `rowClick="edit"` sur le Datagrid ?

Quand on clique sur une ligne du tableau, ça redirige directement vers le formulaire de modification de cet employé. C'est pratique pour aller vite sans avoir à chercher le bouton "Modifier".

### Question 2.2 : Passez perPage à 2. Que se passe-t-il dans l'interface ?

Quand on met `perPage={2}`, le tableau n'affiche plus que 2 employés par page au lieu de 5.
La pagination en bas apparaît avec plusieurs pages (page 1, 2, 3...) pour naviguer entre les employés.
React-Admin envoie aussi des requêtes différentes à l'API avec `_start=0&_end=2` puis `_start=2&_end=4` etc.

---

## Exercice 3 — Création d'un employé

### Question 3.1 : Que se passe-t-il si vous soumettez le formulaire sans remplir le prénom ?

Le formulaire ne se soumet pas et un message d'erreur apparaît en rouge sous le champ vide.
Le message dit quelque chose comme "Ce champ est obligatoire". C'est la validation `required` qui bloque l'envoi du formulaire tant que le champ n'est pas rempli.

### Question 3.2 : Essayez de saisir un salaire de 500 euros. Que se passe-t-il ?

Le formulaire affiche une erreur de validation sous le champ Salaire.
Le message indique que la valeur minimale est 1500 euros, donc 500 n'est pas accepté.
Le formulaire ne peut pas être soumis tant que la valeur est en dessous du minimum.

---

## Exercice 4 — Modification d'un employé

### Question 4.1 : Quelle méthode HTTP est utilisée lors de la sauvegarde d'une modification ?

En regardant dans l'onglet Network, on voit que c'est une requête **PUT** qui est envoyée.
Par exemple : `PUT http://localhost:3002/employees/1`
Le corps de la requête contient toutes les données de l'employé avec les modifications.

### Question 4.2 : À quel moment `useRecordContext()` est-il disponible ? Que retourne-t-il si l'enregistrement n'est pas encore chargé ?

`useRecordContext()` est disponible uniquement à l'intérieur d'un composant qui est enfant d'un contexte React-Admin (comme `Edit` ou `Show`). Il faut que le composant soit "à l'intérieur" du provider qui fournit les données.

Si l'enregistrement n'est pas encore chargé (les données sont en train d'être récupérées depuis l'API), `useRecordContext()` retourne `undefined`. C'est pour ça qu'il faut toujours vérifier si le record existe avant de l'utiliser, par exemple :
```jsx
const record = useRecordContext();
if (!record) return null;
```

---

## Exercice 5 — Fiche détail

### Question 5.1 : Quelle différence y a-t-il entre `SimpleShowLayout` et `TabbedShowLayout` ?

- **SimpleShowLayout** : affiche tous les champs les uns en dessous des autres sur une seule page, simple et basique. C'est ce qu'on utilise quand il n'y a pas trop d'infos à afficher.

- **TabbedShowLayout** : divise les informations en plusieurs onglets (tabs). C'est utile quand on a beaucoup de champs et qu'on veut les organiser par catégorie. Par exemple un onglet "Infos personnelles", un autre "Infos contrat", etc.

Pour notre exercice avec peu de champs, `SimpleShowLayout` est largement suffisant.