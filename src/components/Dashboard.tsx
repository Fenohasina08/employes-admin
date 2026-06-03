import { useGetList } from "react-admin";
import { Grid, Typography, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const { total: totalEmployees, isPending: loadingEmp } = useGetList(
    "employees",
    {
      pagination: { page: 1, perPage: 1 },
    }
  );

  const { total: activeEmployees, isPending: loadingActive } = useGetList(
    "employees",
    {
      pagination: { page: 1, perPage: 1 },
      filter: { active: true },
    }
  );

  const { total: totalInterns, isPending: loadingInterns } = useGetList(
    "interns",
    {
      pagination: { page: 1, perPage: 1 },
    }
  );

  const { total: paidInterns, isPending: loadingPaid } = useGetList(
    "interns",
    {
      pagination: { page: 1, perPage: 1 },
      filter: { isRemunerate: true },
    }
  );

  const renderCard = (
    title: string,
    value: number | undefined,
    loading: boolean,
    color: string,
    to: string
  ) => (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        display: "block",
        height: "100%",
      }}
    >
      <div
        style={{
          background: "#0f172a",
          border: `1px solid ${color}40`,
          borderRadius: "20px",
          padding: "24px",
          height: "180px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundImage: `linear-gradient(135deg, ${color}25, transparent)`,
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          transition: "0.3s ease",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            border: `1px solid ${color}50`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color,
            fontSize: "20px",
          }}
        >
          ◉
        </div>

        <div>
          <Typography
            style={{
              color: "#94a3b8",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {title}
          </Typography>

          <Typography
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              color,
              lineHeight: 1,
              marginTop: "10px",
            }}
          >
            {loading ? <CircularProgress size={24} /> : value ?? 0}
          </Typography>
        </div>
      </div>
    </Link>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "#020617",
        color: "white",
      }}
    >
      <Typography
        style={{
          fontSize: "14px",
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        Tableau de bord
      </Typography>

      <Typography
        variant="h3"
        style={{
          fontWeight: "bold",
          marginTop: "8px",
          marginBottom: "8px",
        }}
      >
        Vue d'ensemble
      </Typography>

      <Typography
        style={{
          color: "#64748b",
          marginBottom: "40px",
        }}
      >
        {new Date().toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          {renderCard(
            "TOTAL EMPLOYÉS",
            totalEmployees,
            loadingEmp,
            "#5EA2FF",
            "/employees"
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          {renderCard(
            "EMPLOYÉS ACTIFS",
            activeEmployees,
            loadingActive,
            "#2EE6A6",
            '/employees?filter={"active":true}'
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          {renderCard(
            "TOTAL STAGIAIRES",
            totalInterns,
            loadingInterns,
            "#FF9D42",
            "/interns"
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          {renderCard(
            "STAGIAIRES RÉMUNÉRÉS",
            paidInterns,
            loadingPaid,
            "#D86CFF",
            '/interns?filter={"isRemunerate":true}'
          )}
        </Grid>
      </Grid>
    </div>
  );
};