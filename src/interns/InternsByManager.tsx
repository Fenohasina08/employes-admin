import { useRecordContext, useGetList } from "react-admin";
import { Card, CardContent, Typography } from "@mui/material";

export const InternsByManager = () => {
  const employee = useRecordContext(); 

  const { data: interns, isPending, error } = useGetList(
    "interns",  
    {  
      filter: { employeeId: employee?.id } 
    }
  );

  if (isPending) return <Typography>⏳ Chargement des stagiaires...</Typography>;
  if (error) return <Typography color="error">🚨 Erreur de chargement.</Typography>;
  if (!interns || interns.length === 0) {
    return <Typography>👥 Aucun stagiaire encadré actuellement.</Typography>;
  }

   return (
    <Card style={{ marginTop: "20px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          📋 Stagiaires encadrés
        </Typography>
        <ul>
          {interns.map((intern) => (
            <li key={intern.id}>
              {intern.firstName} {intern.lastName} - {intern.email}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};