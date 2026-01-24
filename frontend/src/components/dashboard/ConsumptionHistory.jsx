import BaseCard from "./BaseCard"
import { Box, Typography } from "@mui/joy"

export default function ConsumptionHistory({ data }) {
  const maxValue = Math.max(...data.map(d => d.value));
  return (
    <BaseCard sx={{ height: "100%" }}>
      <Typography level="h4" mb={1}>Histórico de Consumo</Typography>


      {data.map(item => (
        <Box key={item.month} sx={{ display: "flex", gap: 2 }}>
          <Typography level="body-xs">{item.month}</Typography>

          <Box
            sx={{
              width: `${(item.value / maxValue) * 100}%`,
              bgcolor: "#e0e7ff",
              p: 0.5,
              borderRadius: 4,
            }}
          >
            {item.value}m³
          </Box>
        </Box>
      ))}

    </BaseCard>
  );
}