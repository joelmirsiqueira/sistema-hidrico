import { Box, Grid } from "@mui/joy";
import Header from "../../components/layout/Header"
import ConsumptionStatusCard from "../../components/dashboard/ConsumptionStatusCard"
import SupplyStatusCard from "../../components/dashboard/SupplyStatusCard"
import RationingStatusCard from "../../components/dashboard/RationingStatusCard"
import ConsumptionHistory from "../../components/dashboard/ConsumptionHistory"
import ReportProblemCard from "../../components/dashboard/ReportProblemCard"

function ClientDashboard() {
  return (
    {/* Dashboard */},
    <Box sx={{
      height: "100vh",
      minHeight: "100vh",

      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      overflowX: "hidden",

      backgroundColor: "#eef2f7",
    }}>
      {/* Header */}
      <Header />

      {/* Content */}
      <Box sx={{
        width: "80vw",
        marginTop: "15px",

        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
      }}>
        {/* Left side (cards)*/}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 8,
            rowGap: "15px"
          }}
        >
          <Box sx={{
            display: "flex",
            gap: "15px",
          }}
          >
            <ConsumptionStatusCard />
            <SupplyStatusCard />
            <RationingStatusCard />
          </Box>

          <Box sx={{
            display: "flex",
            gap: "15px",
          }}
          >
            <Box flexGrow={1}><ReportProblemCard /></Box>
          </Box>
        </Box>

        {/* Right side (histórico) */}
        <Box
          sx={{
            flexGrow: 4,
            overflowY: "auto"
          }}
        >
          <ConsumptionHistory />
        </Box>
      </Box>
    </Box>
  );
}

export default ClientDashboard;