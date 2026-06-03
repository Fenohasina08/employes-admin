import { useRecordContext, useGetOne } from "react-admin";
import { Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ManagerCard = () => {
  const intern = useRecordContext();
  const theme = useTheme();

  const isDark = theme.palette.mode === "dark";

  const cardBg = isDark ? "#0f172a" : "#ffffff";
  const textPrimary = isDark ? "#ffffff" : "#0f172a";
  const textSecondary = isDark ? "#94a3b8" : "#64748b";
  const linkColor = isDark ? "#60a5fa" : "#2563eb";

  const { data: manager, isPending, error } = useGetOne(
    "employees",
    { id: intern?.employeeId },
    { enabled: !!intern?.employeeId }
  );

  if (isPending)
    return (
      <Typography variant="body2" style={{ color: textSecondary }}>
        Chargement du manager...
      </Typography>
    );

  if (error)
    return (
      <Typography variant="body2" color="error">
        Erreur lors du chargement du manager
      </Typography>
    );

  if (!manager) return null;

  return (
    <Card
      style={{
        marginTop: "20px",
        backgroundColor: cardBg,
        borderRadius: "16px",
        border: isDark
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid rgba(0,0,0,0.08)",
        boxShadow: isDark
          ? "0 10px 30px rgba(0,0,0,0.35)"
          : "0 6px 18px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          style={{ color: textPrimary, fontWeight: 700 }}
        >
          📇 Fiche de l'encadrant
        </Typography>

        <Typography style={{ color: textPrimary }}>
          <strong>Nom complet :</strong> {manager.firstName}{" "}
          {manager.lastName}
        </Typography>

        <Typography style={{ color: textPrimary }}>
          <strong>Département :</strong> {manager.department}
        </Typography>

        <Typography style={{ color: textPrimary }}>
          <strong>Email :</strong>{" "}
          <a
            href={`mailto:${manager.email}`}
            style={{
              color: linkColor,
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            {manager.email}
          </a>
        </Typography>

        <Typography style={{ color: textPrimary }}>
          <strong>Statut :</strong>{" "}
          {manager.active ? "🟢 Actif" : "🔴 Inactif"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ManagerCard;