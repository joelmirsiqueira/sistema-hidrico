import BaseCard from "./BaseCard"
import { Box, Typography } from "@mui/joy"

export default function ConsumptionCard() {
    return (
        <BaseCard sx={{ background: "linear-gradient(90deg, #ff8a65, #ff7043)", flexDirection: "row" }}>
            <Box sx={{
                width: "15%",
                height: "100%",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                objectFit: "contain"
            }}>
                <img width={"100%"} src="/public/imgs/icons/Consumo.png" alt="" />
            </Box>

            <Box sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "20px"
            }}>
                <Typography textColor="#fff" level="body-sm">Consumo Mensal Atual</Typography>
                <Typography textColor="#fff" level="h2">11.150L ou 11m³</Typography>
                <Typography textColor="#fff" level="body-xs">▼ 50% mês anterior</Typography>
            </Box>
        </BaseCard>
    )
}