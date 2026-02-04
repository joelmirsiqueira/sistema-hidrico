import BaseCard from "./BaseCard"
import { Box, Typography } from "@mui/joy"
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function ConsumptionHistory() {
  const [historicoDeConsumo, sethistoricoDeConsumo] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function obterhistoricoDeConsumo() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/cliente/listar/consumos", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Erro ao obter histórico de abastecimento");
        }

        sethistoricoDeConsumo(data);
      } catch (error) {
        setErro(error.message);
      }
    }

    obterhistoricoDeConsumo();
  }, []);


  const maxValue = (Math.max(
    1,
    ...historicoDeConsumo.map(item => item.totalConsumido)
  ));

  useEffect(() => {
    if (!historicoDeConsumo || historicoDeConsumo.length === 0) return;

    const maxValue = Math.max(...historicoDeConsumo.map(i => i.totalConsumido));

    historicoDeConsumo.forEach(i => {
      console.log((i.totalConsumido / maxValue) * 100);
    });
  }, [historicoDeConsumo]);
  return (
    <BaseCard sx={{ background: "linear-gradient(90deg, #112859, #14223D)", height: "100%", flexDirection: "column" }}>
      <Typography textColor="#fff" level="h4" mb={1}>Histórico de Consumo</Typography>


      {historicoDeConsumo.map(item => (
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "center"
          }}
        >
          <Typography
            textColor="#fff"
            level="body-xs"
            sx={{ width: "20%", fontSize: "0.7rem", }}
          >
            {item.minuto}
          </Typography>

          <Box
            sx={{
              width: `${(item.totalConsumido / maxValue) * 100}%`,
              maxWidth: "70%",
              display: "flex",
              justifyContent: "center",
              bgcolor: "#e0e7ff",
              color: "#112859",
              fontWeight: "bold",
              fontSize: "1rem",
              p: 0.5,
              borderRadius: 4,
            }}
          >
            {item.totalConsumido * 10}m³
          </Box>
        </Box>
      ))}

    </BaseCard>
  );
}