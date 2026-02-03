import BaseCard from "./BaseCard";
import { Box, Typography, Switch } from "@mui/joy";

export default function WaterGatesCard({ data = [], onToggle }) {
  return (
    <BaseCard>
      <Typography level="h4" textAlign="center" mb={1}>
        Estado das Comportas
      </Typography>

      {data.map((gate) => (
        <Box
          key={gate.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 1,
          }}
        >
          <Typography level="body-xs" sx={{ width: "5%" }}>
            {gate.id}
          </Typography>

          <Box
            sx={{
              width: "80%",
              textAlign: "center",
              bgcolor: gate.isOpen ? "#136C13" : "#555E68",
              borderRadius: 4,
              color: "white",
              p: 0.5,
            }}
          >
            {gate.isOpen ? "Aberto" : "Fechado"}
          </Box>

          <Switch
            checked={gate.isOpen}
            onChange={(e) =>
              onToggle(gate.id, e.target.checked)
            }
            color={gate.isOpen ? "success" : "neutral"}
            variant={gate.isOpen ? "solid" : "outlined"}
          />
        </Box>
      ))}
    </BaseCard>
  );
}

