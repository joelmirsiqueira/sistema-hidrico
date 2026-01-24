import { Box, Grid } from "@mui/joy";
import Header from "../../components/layout/Header"
import ConsumptionCard from "../../components/dashboard/ConsumptionCard"
import SupplyStatusCard from "../../components/dashboard/SupplyStatusCard"
import RationingStatusCard from "../../components/dashboard/RationingStatusCard"
import ConsumptionHistory from "../../components/dashboard/ConsumptionHistory"

const consumptionHistoryData = [
  { month: "Jan", value: 20 },
  { month: "Fev", value: 8 },
  { month: "Mar", value: 10 },
  { month: "Mar", value: 15 },
  { month: "Mar", value: 15 },
  { month: "Mar", value: 15 },
  { month: "Mar", value: 15 },
  { month: "Mar", value: 15 },
  { month: "Mar", value: 15 },
  { month: "Mar", value: 15 },
  { month: "Mar", value: 15 },
];

function ClientDashboard() {
  return (
    <Box sx={{
      height: "100vh",
      bgcolor: "#eef2f7",
      minHeight: "100vh",
      backgroundColor: "#eef2f7",
      overflowX: "hidden",
    }}>
      <Header />

      <Box container sx={{
        display: "flex",
        flexDirection: "row",
        gap: "15px",
        width: "80vw",
        margin: "auto",
        marginTop: "15px"
      }}>
        {/* COLUNA ESQUERDA (3 cards) */}
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
            flexDirection: "row",
            gap: "15px"
          }}
          >
            <ConsumptionCard />
            <SupplyStatusCard />
            <RationingStatusCard />
          </Box>

          <Box sx={{
            display: "flex",
            flexDirection: "row",
            gap: "15px",
          }}
          >
            <Box flexGrow={2}><ConsumptionCard /></Box>
            <Box flexGrow={1}><SupplyStatusCard /></Box>
          </Box>
        </Box>

        {/* COLUNA DIREITA (Histórico) */}
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