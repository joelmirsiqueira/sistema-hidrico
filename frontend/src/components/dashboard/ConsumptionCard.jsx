import BaseCard from "./BaseCard"
import { Typography } from "@mui/joy"

export default function ConsumptionCard() {
    return (
        <BaseCard sx={{ bgcolor: "#ff8a65", color: "#fff" }}>
            <Typography level="body-sm">Consumo Mensal Atual</Typography>
            <Typography level="h2">11.150L ou 11m³</Typography>
            <Typography level="body-xs">▼ 50% mês anterior</Typography>
        </BaseCard>
    )
}