import { Box } from "@mui/joy";
import { useEffect, useState } from "react";

import Header from "../../components/layout/Header";
import ReservoirLevelCard from "../../components/dashboard/ReservoirLevelCard";
import WaterGatesCard from "../../components/dashboard/WaterGatesCard";
import ListClientsCard from "../../components/dashboard/ListClientsCard";

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
                        isOpen: gate.status === "on",
                    }))
                );
            } catch (error) {
                console.error("Erro ao listar comportas:", error);
            }
        }

        fetchWaterGates();
    }, []);

    const toggleGate = async (id, newState) => {
    // Atualização
    setWaterGates((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, isOpen: newState } : g
      )
    );

    // Envia para o backend
    try {
      await fetch("http://localhost:3000/funcionario/acionar/comporta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          numero: id,
          comando: newState ? "on" : "off",
        }),
      });
    } catch (error) {
      console.error("Erro ao acionar comporta:", error);

      // Em caso de erro
      setWaterGates((prev) =>
        prev.map((g) =>
          g.id === id ? { ...g, isOpen: !newState } : g
        )
      );
    }
  };

    return (
        <Box
            sx={{
                height: "100vh",
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
                    flexDirection: "column"
                }}
            >
                <Box sx={{width: "100%", display: "flex", gap: "15px"}}>
                    <Box flex={3}><ReservoirLevelCard /></Box>
                    <Box flex={2}><WaterGatesCard data={waterGates} onToggle={toggleGate}/></Box>                   
                </Box>

                <Box sx={{display: "flex", flex: 1, gap: "15px"}}>
                    <ListClientsCard />
                </Box>
            </Box>
        </Box>
    );
}
