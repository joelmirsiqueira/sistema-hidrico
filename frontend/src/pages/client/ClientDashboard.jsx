import { Box, Grid } from "@mui/joy";
import Header from "../../components/layout/Header"
import ConsumptionCard from "../../components/dashboard/ConsumptionCard"
import SupplyStatusCard from "../../components/dashboard/SupplyStatusCard"
import RationingStatusCard from "../../components/dashboard/RationingStatusCard"
import ConsumptionHistory from "../../components/dashboard/ConsumptionHistory"

const consumptionHistoryData = [
  { month: "01/26", value: 30 },
  { month: "12/25", value: 10 },
  { month: "11/25", value: 10 },
  { month: "10/25", value: 15 },
  { month: "09/25", value: 15 },
  { month: "08/25", value: 15 },
  { month: "07/25", value: 15 },
  { month: "06/25", value: 15 },
  { month: "05/25", value: 15 },
  { month: "04/25", value: 15 },
  { month: "03/25", value: 15 },
];

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
      <Box container sx={{
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
            flexGrow: 9,
            rowGap: "15px"
          }}
        >
          <Box sx={{
            display: "flex",
            gap: "15px",
          }}
          >
            <ConsumptionCard />
            <SupplyStatusCard />
            <RationingStatusCard />
          </Box>

          <Box sx={{
            display: "flex",
            gap: "15px",
          }}
          >
            <Box flexGrow={2}><ConsumptionCard /></Box>
            <Box flexGrow={1}><SupplyStatusCard /></Box>
          </Box>
        </Box>

        {/* Right side (histórico) */}
        <Box
          sx={{
            flexGrow: 3,
            overflowY: "auto"
          }}
        >
          <ConsumptionHistory data={consumptionHistoryData}/>
        </Box>
      </Box>
    </Box>
  );
}

export default ClientDashboard;