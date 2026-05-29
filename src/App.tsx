import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeCreate } from "./employees/EmployeeCreate";

const dataProvider = jsonServerProvider("http://localhost:3002");

export default function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="employees"
        list={EmployeeList}
        create={EmployeeCreate}
      />
    </Admin>
  );
}