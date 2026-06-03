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

## Exercice 6 - InternList

### Question 6.1:  ReferenceField génère quel appel HTTP pour résoudre le manager ? Vérifiez dans l'onglet Network de votre navigateur.  

Le composant <ReferenceField> émet une requête HTTP avec la méthode GET vers l'endpoint http://localhost:3002/employees/{id} (où {id} représente l'identifiant du manager) afin de récupérer les détails de l'employé associé au stagiaire.

###  6.2 : Que se passe-t-il visuellement si managerId ne correspond à aucun employé ?
Si le managerId ne correspond à aucun employé existant, l'application ne produit pas de plantage. Visuellement, la colonne "Encadrant" reste simplement vide pour cette ligne du tableau.

# Exercice 7 — InternCreate & InternEdit

### 7.1 : Quelle méthode HTTP est émise lors de la soumission de InternCreate ? Vers quel endpoint ?
Une méthode POST est émise vers l'endpoint /interns pour insérer le nouveau stagiaire en base de données.
### 7.2 : 7.2 : Quel hook utilisez-vous pour la validation conditionnelle de remuneration, et pourquoi ?
Le hook utilisé est useWatch de la bibliothèque react-hook-form. On l'utilise car la validation par défaut est statique. useWatch permet de surveiller la valeur de la case à cocher isRemunerate en temps réel. Ainsi, le formulaire sait instantanément s'il doit rendre le champ remuneration obligatoire ou non.

# Exercice 8 — InternShow & ManagerCard

# 8.1 : Quelle est la différence entre useGetOne et ReferenceField ? Quand préférer l'un ou l'autre ?
-ReferenceField  est un composant d'interface (UI) clé en main. Il s'occupe de tout : appeler l'API, gérer l'affichage du texte et créer automatiquement un lien cliquable vers la ressource liée. On le préfère dans les structures d'affichage classiques (comme les tableaux ou les formulaires standard).

-useGetOne  est un hook de données. Il ne fournit aucun visuel, mais uniquement les données brutes (data, isPending, error). On le préfère lorsqu'on doit construire un composant 100 % sur mesure avec une mise en page spécifique (comme notre ManagerCard).
# 8.2 : Que se passe-t-il si useGetOne reçoit id: undefined sans l'option enabled ? Comment ce paramètre résout-il le problème ?
-Sans enabled : Le hook s'exécute dès le premier affichage du composant. Si les données du stagiaire ne sont pas encore arrivées, l'ID vaut undefined. L'application va alors tenter d'appeler une URL invalide (comme /employees/undefined), ce qui déclenche une erreur 404 inutile dans la console réseau .

-Avec enabled  : On lui passe une condition booléenne (ex: enabled: !!intern?.employeeId). Le hook attend sagement que l'identifiant soit disponible et valide avant de déclencher la requête HTTP, ce qui sécurise notre application.

# Exercice 9 — Enrichissement EmployeeShow

### 9.1 : Différence entre useGetList et ReferenceManyField ? Dans quel cas useGetList est-il indispensable ?
ReferenceManyField  : C'est un composant d'interface (UI) "tout-en-un". Il est conçu pour afficher une relation un-à-plusieurs directement dans une page (par exemple, afficher une liste de stagiaires sous forme de tableau <Datagrid> dans la fiche d'un employé). Il gère lui-même l'appel réseau et la structure visuelle.

useGetList  : C'est un hook de données pur. Il se contente de déclencher la requête HTTP et de te retourner les données brutes (un tableau JavaScript), sans aucune mise en forme.

Quand est-il indispensable ? useGetList devient obligatoire dès que tu as besoin de manipuler, filtrer manuellement ou calculer des données avant de les afficher. C'est le cas si tu veux faire des statistiques, des sommes de salaires, dessiner un graphique (Chart.js), ou créer un affichage sur mesure qui sort des sentiers battus de React-Admin.
### 9.2 Comment optimiser la requête de DepartmentStats pour ne récupérer que le total sans charger tous les employés ?
Pour avoir le total sans ralentir l'application, on triche avec la pagination en demandant un seul employé par page (perPage: 1).

Comment ça marche ? Au lieu de demander au serveur de nous donner les fiches de 500 employés d'un coup (ce qui est très lourd et lent), on lui demande de nous envoyer la fiche d'un seul employé.

Pourquoi on a quand même le bon chiffre ? Le serveur est bien fait : même s'il ne nous envoie qu'une seule fiche, il calcule toujours le nombre total de résultats en arrière-plan. React-Admin récupère automatiquement ce chiffre dans la variable total.

Le résultat : Le chargement est instantané parce que le réseau ne télécharge presque rien, mais notre compteur affiche quand même le vrai nombre global !

# Exercice 10 — QuickStatusToggle (useUpdate)

### 10.1 : Quelle méthode HTTP useUpdate utilise-t-il par défaut ? Comment forcer PATCH au lieu de PUT ?
Par défaut : useUpdate utilise la méthode PUT (ce qui remplace la totalité de l'objet sur le serveur).

Pour forcer PATCH : On ajoute une option dans le paramètre meta lors de l'appel, de cette manière :

    update("employees", { id, data, meta: { method: 'PATCH' } })

### 10.2 : Pourquoi previousData est-il nécessaire ? Que se passe-t-il si on l'omet ?
Pourquoi c'est nécessaire ? React-Admin utilise le mode "optimiste" : quand tu cliques, l'interface change immédiatement de couleur sur l'écran sans attendre la réponse du serveur pour que l'application paraisse ultra-rapide.

Que se passe-t-il si on l'omet ? Si la requête réseau échoue (panne de serveur, coupure internet), l'application doit pouvoir annuler le changement visuel. Sans previousData, React-Admin est incapable de revenir en arrière (pas de rollback). Le bouton restera bloqué sur le mauvais statut, affichant une fausse information à l'utilisateur.

# Exercice 11 — useCreate & Formulaire rapide

### 11.1 - Quelle différence entre utiliser useCreate dans un composant custom et utiliser le composant <Create> de React-Admin ?
Le composant <Create>  : C'est une page entière clé en main fournie par React-Admin. Elle gère tout l'affichage, crée le formulaire et redirige automatiquement l'utilisateur vers une autre page (la liste ou le détail) après la sauvegarde.

Le hook useCreate  : C'est juste une fonction invisible (sans aucune interface). Elle te permet d'envoyer des données au serveur depuis n'importe où, par exemple depuis un bouton ou une fenêtre modale (pop-up), sans changer de page et en gardant le contrôle total de ton design.
### 11.2 : Comment gérez-vous le rechargement de la liste après une création réussie via useCreate ?
Le comportement automatique : React-Admin est intelligent. Dès que useCreate réussit à créer un nouveau stagiaire, il prévient automatiquement le système de cache de l'application. La liste des stagiaires détecte ce changement et se recharche toute seule en arrière-plan pour afficher la nouvelle ligne.

La méthode manuelle (si besoin) : Si la liste refuse de bouger, on peut utiliser le hook useRefresh() de React-Admin et l'exécuter dans le bloc onSuccess de notre fonction de création pour forcer le rafraîchissement visuel.

# Exercice 12 — Dashboard

### 12.1 : Les 4 appels useGetList se font-ils en parallèle ou en séquence ? Justifiez.
Ils se font en parallèle. React-Admin utilise React Query en arrière-plan. Lorsque le composant est chargé, tous les hooks s'exécutent simultanément et le navigateur envoie les 4 requêtes HTTP en même temps sans attendre la réponse des unes pour lancer les autres.
### 12.2 : Pourquoi perPage: 1 est préférable à perPage: 100 ici ?
Pour optimiser les performances. Le Dashboard a uniquement besoin du nombre global (la propriété total) et n'affiche aucune liste de données. En configurant perPage: 1, le serveur calcule le total mais ne renvoie l'objet complet que d'un seul enregistrement. Cela réduit la taille de la réponse HTTP et économise les ressources du serveur et du réseau.