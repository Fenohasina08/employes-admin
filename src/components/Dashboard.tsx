import { useGetList } from "react-admin";
import { Grid, Typography, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

export const Dashboard = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const bgCard = isDark ? "#0f172a" : "#ffffff";
  const pageBg = isDark ? "#020617" : "#f8fafc";
  const textPrimary = isDark ? "#ffffff" : "#0f172a";
  const textSecondary = isDark ? "#94a3b8" : "#64748b";
  const gridColor = isDark ? "#1e293b" : "#e2e8f0";

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

  const { total: paidInterns, isPending: loadingPaid } = useGetList("interns", {
    pagination: { page: 1, perPage: 1 },
    filter: { isRemunerate: true },
  });

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
          height: "220px",
          width: "15vw",
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
            width: "58px",
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
              textAlign: "center",
            }}
          >
            {title}
          </Typography>

          <Typography
            style={{
              fontSize: "68px",
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

   const inactiveEmployees = (totalEmployees ?? 0) - (activeEmployees ?? 0);
  const unpaidInterns = (totalInterns ?? 0) - (paidInterns ?? 0);

  const employeePieData = [
    { name: "Actifs", value: activeEmployees ?? 0 },
    { name: "Inactifs", value: inactiveEmployees },
  ];

  const internPieData = [
    { name: "Rémunérés", value: paidInterns ?? 0 },
    { name: "Non rémunérés", value: unpaidInterns },
  ];

  const barData = [
    {
      name: "Employés",
      Total: totalEmployees ?? 0,
      Actifs: activeEmployees ?? 0,
    },
    {
      name: "Stagiaires",
      Total: totalInterns ?? 0,
      Actifs: paidInterns ?? 0,
    },
  ];

  const EMPLOYEE_COLORS = ["#5EA2FF", "#1e3a5f"];
  const INTERN_COLORS = ["#D86CFF", "#5b2175"];

  const chartCardStyle: React.CSSProperties = {
    background: bgCard,
    borderRadius: "20px",
    padding: "24px",
    boxShadow: isDark
      ? "0 10px 30px rgba(0,0,0,0.35)"
      : "0 6px 18px rgba(0,0,0,0.08)",
    height: "100%",
  };

  const sectionTitle = (label: string) => (
    <Typography
      style={{
        color: textSecondary,
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        marginBottom: "16px",
      }}
    >
      {label}
    </Typography>
  );

  const isLoading = loadingEmp || loadingActive || loadingInterns || loadingPaid;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: bgCard,
            border: `1px solid ${gridColor}`,
            borderRadius: "10px",
            padding: "10px 14px",
            color: textPrimary,
            fontSize: "13px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <strong>{payload[0].name}</strong>: {payload[0].value}
        </div>
      );
    }
    return null;
  };

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
          textAlign: "center",
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
          textAlign: "center",
        }}
      >
        Vue d'ensemble
      </Typography>

      <Typography
        style={{
          color: textSecondary,
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        {new Date().toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </Typography>

       <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={8}>
          {renderCard(
            "TOTAL EMPLOYÉS",
            totalEmployees,
            loadingEmp,
            "#5EA2FF",
            "/employees"
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          {renderCard(
            "EMPLOYÉS ACTIFS",
            activeEmployees,
            loadingActive,
            "#2EE6A6",
            '/employees?filter={"active":true}'
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          {renderCard(
            "TOTAL STAGIAIRES",
            totalInterns,
            loadingInterns,
            "#FF9D42",
            "/interns"
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          {renderCard(
            "STAGIAIRES RÉMUNÉRÉS",
            paidInterns,
            loadingPaid,
            "#D86CFF",
            '/interns?filter={"isRemunerate":true}'
          )}
        </Grid>
      </Grid>

       <Typography
        style={{
          fontSize: "13px",
          color: textSecondary,
          textTransform: "uppercase",
          letterSpacing: "2px",
          marginTop: "52px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Résumé graphique
      </Typography>

      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={3} justifyContent="center" style={{ marginBottom: "40px" , width: "100%"   }}>

           <Grid item xs={12} md={12}>
            <div style={chartCardStyle}>
              {sectionTitle("Comparaison globale")}
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData} barCategoryGap="35%">
                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke={gridColor}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: textSecondary, fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: textSecondary, fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: `${gridColor}80` }} />
                  <Legend
                    wrapperStyle={{ color: textSecondary, fontSize: 12, paddingTop: 12 }}
                  />
                  <Bar dataKey="Total" fill="#5EA2FF" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Actifs" fill="#2EE6A6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Grid>

           <Grid item xs={12} sm={6} md={6}>
            <div style={chartCardStyle}>
              {sectionTitle("Répartition employés")}
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={employeePieData}
                    cx="50%"
                    cy="45%"
                    innerRadius={70}
                    outerRadius={105}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {employeePieData.map((_, i) => (
                      <Cell key={i} fill={EMPLOYEE_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ color: textSecondary, fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Grid>

           <Grid item xs={12} sm={6} md={6}>
            <div style={chartCardStyle}>
              {sectionTitle("Répartition stagiaires")}
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={internPieData}
                    cx="50%"
                    cy="45%"
                    innerRadius={70}
                    outerRadius={105}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {internPieData.map((_, i) => (
                      <Cell key={i} fill={INTERN_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ color: textSecondary, fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Grid>

        </Grid>
      )}
    </div>
  );
};