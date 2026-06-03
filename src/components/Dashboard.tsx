import { useGetList } from "react-admin";
import { Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";

export const Dashboard = () => {
  const { total: totalEmployees, isPending: loadingEmp } = useGetList("employees", {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: activeEmployees, isPending: loadingActive } = useGetList("employees", {
    pagination: { page: 1, perPage: 1 },
    filter: { active: true },
  });

  const { total: totalInterns, isPending: loadingInterns } = useGetList("interns", {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: paidInterns, isPending: loadingPaid } = useGetList("interns", {
    pagination: { page: 1, perPage: 1 },
    filter: { isRemunerate: true },
  });

  const renderCard = (title: string, value: number | undefined, loading: boolean, color: string) => (
    <Card style={{ borderTop: `4px solid ${color}`, height: "100%" }}>
      <CardContent style={{ textAlign: "center" }}>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom style={{ fontWeight: "bold", textTransform: "uppercase" }}>
          {title}
        </Typography>
        <Typography variant="h3" style={{ fontWeight: "bold", marginTop: "10px", color: "#2c3e50" }}>
          {loading ? <CircularProgress size={28} /> : value ?? 0}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <div style={{ marginTop: "24px" }}>
      <Typography variant="h4" style={{ marginBottom: "24px", fontWeight: "bold" }}>
        📊 Vue d'ensemble de l'entreprise
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          {renderCard("Total Employés", totalEmployees, loadingEmp, "#2196f3")}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {renderCard("Employés Actifs", activeEmployees, loadingActive, "#4caf50")}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {renderCard("Total Stagiaires", totalInterns, loadingInterns, "#ff9800")}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {renderCard("Stagiaires Rémunérés", paidInterns, loadingPaid, "#e91e63")}
        </Grid>
      </Grid>
    </div>
  );
};