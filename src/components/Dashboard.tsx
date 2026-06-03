import { useGetList } from "react-admin";
import { Grid, Typography, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export const Dashboard = () => {
  const theme = useTheme(); // ⭐ récupère light/dark automatiquement

  const isDark = theme.palette.mode === "dark";

  const bgCard = isDark ? "#0f172a" : "#ffffff";
  const pageBg = isDark ? "#020617" : "#f8fafc";
  const textPrimary = isDark ? "#ffffff" : "#0f172a";
  const textSecondary = isDark ? "#94a3b8" : "#64748b";

  const { total: totalEmployees, isPending: loadingEmp } = useGetList(
    "employees",
    { pagination: { page: 1, perPage: 1 } }
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
    { pagination: { page: 1, perPage: 1 } }
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
          background: bgCard,
          border: `1px solid ${color}40`,
          borderRadius: "20px",
          padding: "24px",
          height: "180px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundImage: `linear-gradient(135deg, ${color}20, transparent)`,
          boxShadow: isDark
            ? "0 10px 30px rgba(0,0,0,0.35)"
            : "0 6px 18px rgba(0,0,0,0.08)",
          transition: "0.3s ease",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            border: `1px solid ${color}60`,
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
              color: textSecondary,
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {title}
          </Typography>

          <Typography
            style={{
              fontSize: "54px",
              fontWeight: "bold",
              color: textPrimary,
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
        position: "fixed",
        top: 0,
        left: "240px",
        width: "calc(100vw - 240px)",
        height: "100vh",
        padding: "30px",
        background: pageBg,
        color: textPrimary,
        overflowY: "auto",
      }}
    >
      <Typography
        style={{
          fontSize: "14px",
          color: textSecondary,
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
          color: textPrimary,
        }}
      >
        Vue d'ensemble
      </Typography>

      <Typography
        style={{
          color: textSecondary,
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