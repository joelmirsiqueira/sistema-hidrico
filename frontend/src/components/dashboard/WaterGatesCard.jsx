import BaseCard from "./BaseCard";
import { Box, Typography, Switch } from "@mui/joy";

export default function WaterGatesCard({ data = [] }) {
  async function acionarComporta(numero, comando) {
    try {
      await fetch("http://localhost:3000/funcionario/acionar/comporta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ numero, comando }),
      });
    } catch (error) {
      console.error("Erro ao acionar comporta:", error);
    }
  }

  const handleToggle = async (id, isOpen) => {
    const comando = isOpen ? "on" : "off";
    await acionarComporta(id, comando);
  };

  return (
    <BaseCard sx={{ height: "100%" }}>
      <Typography textAlign="center" level="h4" mb={1}>
        Estado das Comportas
      </Typography>

      {data.map(item => {
        const isOpen = item.value === "Aberto";

        return (
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
                bgcolor: isOpen ? "#136C13" : "#555E68",
                p: 0.5,
                borderRadius: 4,
                color: "white",
              }}
            >
              {item.value}
            </Box>

            <Switch
              checked={isOpen}
              color={isOpen ? "success" : "neutral"}
              variant={isOpen ? "solid" : "outlined"}
              onChange={(e) => handleToggle(item.id, e.target.checked)}
            />
          </Box>
        );
      })}
    </BaseCard>
  );
}
