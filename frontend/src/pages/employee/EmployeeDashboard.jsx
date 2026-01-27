import { Box, Grid } from "@mui/joy";
import Header from "../../components/layout/Header"
import SupplyStatusCard from "../../components/dashboard/SupplyStatusCard"
import RationingStatusCard from "../../components/dashboard/RationingStatusCard"
import ReservoirLevelCard from "../../components/dashboard/ReservoirLevelCard";
import WaterGatesCard from "../../components/dashboard/WaterGatesCard";

const waterGates = [
    { id: 1, value: "Aberto" },
    { id: 2, value: "Fechado" },
];

function EmployeeDashboard() {
    return (
        {/* Dashboard */ },
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
                        <ReservoirLevelCard />
                    </Box>
                </Box>

                {/* Right side (Comportas) */}
                <Box
                    sx={{
                        flexGrow: 3,
                        overflowY: "auto"
                    }}
                >
                    <WaterGatesCard data={waterGates} />
                </Box>
            </Box>
        </Box>
    );
}

export default EmployeeDashboard;