import * as React from 'react';
import BaseCard from "./BaseCard";
import { Box, Typography, Switch } from "@mui/joy";

export default function WaterGatesCard({ data = [] }) {
  const [gates, setGates] = React.useState(() =>
    data.map(item => ({
      ...item,
      isOpen: item.value === "Aberto"
    }))
  );

  async function acionarComporta(numero, comando) {
    try {
      await fetch("http://localhost:3000/funcionario/acionar/comporta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          numero,
          comando,
        }),
      });
    } catch (error) {
      console.error("Erro ao acionar comporta:", error);
    }
  }

  const handleToggle = async (id) => {
    const gateAtual = gates.find(g => g.id === id);
    if (!gateAtual) return;

    const novoEstado = !gateAtual.isOpen;
    const comando = novoEstado ? "on" : "off";

    // Atualiza a UI
    setGates(prev =>
      prev.map(gate =>
        gate.id === id
          ? {
              ...gate,
              isOpen: novoEstado,
              value: novoEstado ? "Aberto" : "Fechado",
            }
          : gate
      )
    );

    // Envia pro backend
    await acionarComporta(id, comando);
  };

  return (
    <BaseCard sx={{ height: "100%" }}>
      <Typography textAlign="center" level="h4" mb={1}>
        Estado das Comportas
      </Typography>

      {gates.map(item => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <Typography level="body-xs" sx={{ width: "5%" }}>
            {item.id}
          </Typography>

          <Box
            sx={{
              width: "80%",
              display: "flex",
              justifyContent: "center",
              bgcolor: item.isOpen ? "#136C13" : "#555E68",
              p: 0.5,
              borderRadius: 4,
              color: "white",
            }}
          >
            {item.value}
          </Box>

          <Switch
            checked={item.isOpen}
            color={item.isOpen ? "success" : "neutral"}
            variant={item.isOpen ? "solid" : "outlined"}
            onChange={() => handleToggle(item.id)}
          />
        </Box>
      ))}
    </BaseCard>
  );
}
