import { useRecordContext, useGetOne } from "react-admin";
import { Card, CardContent, Typography } from "@mui/material";

const ManagerCard = () => {
   const intern = useRecordContext();
  
   const { data: manager, isPending, error } = useGetOne(
    "employees",
    { id: intern?.employeeId },
    { enabled: !!intern?.employeeId }
  );

   if (isPending) return <Typography variant="body2">Chargement du manager...</Typography>;
  if (error) return <Typography variant="body2" color="error">Erreur lors du chargement du manager</Typography>;
  if (!manager) return null;

   return (
    <Card style={{ marginTop: "20px", backgroundColor: "#f5f5f5" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          📇 Fiche de l'encadrant (Composant Custom)
        </Typography>
        <Typography variant="body1">
          <strong>Nom complet :</strong> {manager.firstName} {manager.lastName}
        </Typography>
        <Typography variant="body1">
          <strong>Département :</strong> {manager.department}
        </Typography>
        <Typography variant="body1">
          <strong>Email :</strong>{" "}
          <a href={`mailto:${manager.email}`} style={{ color: "#1976d2", textDecoration: "none" }}>
            {manager.email}
          </a>
        </Typography>
        <Typography variant="body1">
          <strong>Statut :</strong> {manager.active ? "🟢 Actif" : "🔴 Inactif"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ManagerCard;