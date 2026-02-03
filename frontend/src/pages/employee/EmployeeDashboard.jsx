import { Box } from "@mui/joy";
import Header from "../../components/layout/Header";
import ReservoirLevelCard from "../../components/dashboard/ReservoirLevelCard";
import WaterGatesCard from "../../components/dashboard/WaterGatesCard";
import { useEffect, useState } from "react";

export default function EmployeeDashboard() {
  const [waterGates, setWaterGates] = useState([]);

  useEffect(() => {
    async function fetchWaterGates() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/funcionario/listar/comportas",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erro ao listar comportas");
        }

        setWaterGates(
          data.map((gate) => ({
            id: gate.numero,
            value: gate.status === "on" ? "Aberto" : "Fechado",
          }))
        );
      } catch (error) {
        console.error("Erro ao listar comportas:", error);
      }
    }

    fetchWaterGates();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#eef2f7",
      }}
    >
      <Header />

      <Box
        sx={{
          width: "80vw",
          marginTop: "15px",
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ flexGrow: 9 }}>
          <ReservoirLevelCard />
        </Box>

        <Box sx={{ flexGrow: 3 }}>
          <WaterGatesCard data={waterGates} />
        </Box>
      </Box>
    </Box>
  );
}
