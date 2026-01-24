
import BaseCard from "./BaseCard"
import { Typography } from "@mui/joy"

export default function SupplyStatusCard() {
    return (
        <BaseCard sx={{ bgcolor: "#65ff6d", color: "#fff" }}>
            <Typography level="body-sm">Estado do Abastecimeto</Typography>
            <Typography level="h2">Ativo</Typography>
            <Typography level="body-xs">01:23:30 para o encerramento</Typography>
        </BaseCard>
    )
}