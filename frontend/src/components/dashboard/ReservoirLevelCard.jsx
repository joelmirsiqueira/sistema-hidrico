import BaseCard from "./BaseCard"
import { Typography } from "@mui/joy"

export default function ReservoirLevelCard() {
    return (
        <BaseCard sx={{ bgcolor: "#ffc934", color: "#fff" }}>
            <Typography level="body-sm">Nível do Reservatório</Typography>
            <Typography level="h2">253.593L ou 200m³</Typography>
            <Typography level="body-xs">Capacidade total: 500m³</Typography>
        </BaseCard>
    )
}