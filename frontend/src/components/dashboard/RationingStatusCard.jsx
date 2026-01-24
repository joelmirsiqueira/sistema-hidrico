import BaseCard from "./BaseCard"
import { Typography } from "@mui/joy"

export default function RationingStatusCard() {
    return (
        <BaseCard sx={{ bgcolor: "#65ff6d", color: "#fff" }}>
            <Typography level="body-sm">Estado do Racionamento</Typography>
            <Typography level="h2">Inativo</Typography>
            <Typography level="body-xs"> .</Typography>
        </BaseCard>
    )
}