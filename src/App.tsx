import { Admin, Resource, defaultTheme } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeCreate } from "./employees/EmployeeCreate";
import { EmployeeShow } from "./employees/EmployeeShow";
import { EmployeeEdit } from "./employees/EmployeeEdit";

import { InternsList } from "./interns/InternsList";
import { InternsCreate } from "./interns/InternsCreate";
import { InternsEdit } from "./interns/InternsEdit";
import { InternsShow } from "./interns/InternsShow";

import { Dashboard } from "./components/Dashboard";

const dataProvider = jsonServerProvider("http://localhost:3002");

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const theme = createTheme({
    ...defaultTheme,
    palette: {
      mode,  

      primary: { main: "#6366F1" },
      secondary: { main: "#14B8A6" },

      ...(mode === "dark"
        ? {
            background: {
              default: "#0B1220",
              paper: "#111827",
            },
          }
        : {
            background: {
              default: "#F8FAFC",
              paper: "#FFFFFF",
            },
          }),

      text: {
        primary: mode === "dark" ? "#E5E7EB" : "#0F172A",
        secondary: "#64748b",
      },
    },

    shape: { borderRadius: 14 },
  });

  return (
    <ThemeProvider theme={theme}>
       <div
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          zIndex: 9999,
        }}
      >
        <button
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            background: mode === "dark" ? "#fff" : "#111827",
            color: mode === "dark" ? "#111827" : "#fff",
            fontWeight: "bold",
          }}
        >
          {mode === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <Admin
        dashboard={Dashboard}
        dataProvider={dataProvider}
        theme={theme}
        title="HR Management System"
      >
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
          show={InternsShow}
        />
      </Admin>
    </ThemeProvider>
  );
}