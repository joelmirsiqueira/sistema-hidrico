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

  const handleToggle = (id) => {
    setGates(prev =>
      prev.map(gate =>
        gate.id === id
          ? {
              ...gate,
              isOpen: !gate.isOpen,
              value: !gate.isOpen ? "Aberto" : "Fechado"
            }
          : gate
      )
    );
  };

  return (
    <BaseCard sx={{ height: "100%" }}>
      <Typography level="h4" mb={1}>
        Estado de Comportas
      </Typography>

      {gates.map(item => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "center"
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
              color: "white"
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
