import BaseCard from "./BaseCard"
import { Box, Typography } from "@mui/joy"

export default function ConsumptionHistory({ data }) {
  const maxValue = Math.max(...data.map(d => d.value));
  return (
    <BaseCard sx={{ background: "linear-gradient(90deg, #112859, #14223D)", height: "100%", flexDirection: "column"}}>
      <Typography textColor="#fff" level="h4" mb={1}>Histórico de Consumo</Typography>


      {data.map(item => (
        <Box key={item.month}
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center"
          }}
        >
          <Typography textColor="#fff" level="body-xs" sx={{
            width: "10%"
          }}
          >{item.month}</Typography>

          <Box
            sx={{
              width: `${(item.value / maxValue) * 100}%`,
              maxWidth: "80%",
              display: "flex",
              justifyContent: "center",
              bgcolor: "#e0e7ff",
              color: "#112859",
              fontWeight: "bold",
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