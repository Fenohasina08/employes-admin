import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeCreate } from "./employees/EmployeeCreate";
import { EmployeeShow } from "./employees/EmployeeShow";
import { EmployeeEdit } from "./employees/EmployeeEdit";
import { InternsShow } from "./interns/InternsShow";
import { InternsEdit } from "./interns/InternsEdit";
import { InternsCreate } from "./interns/InternsCreate";
import { InternsList } from "./interns/InternsList";

const dataProvider = jsonServerProvider("http://localhost:3002");

export default function App() {
  return (
    <Admin dataProvider={dataProvider}>
     <Resource
  name="employees"
  list={EmployeeList}
  create={EmployeeCreate}
  edit={EmployeeEdit}
  show={EmployeeShow}
/>

<Resource
  name="interns"
  list={InternsList}
  create={InternsCreate}
  edit={InternsEdit}
  show={InternsShow }
/>
    </Admin>
  );
}