
import BaseCard from "./BaseCard"
import { Box, Typography } from "@mui/joy"

export default function SupplyStatusCard() {
    return (
        <BaseCard sx={{ background: "linear-gradient(90deg, #35DEA4, #0EA672)", flexDirection: "row" }}>
            <Box sx={{
                width: "15%",
                height: "100%",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                objectFit: "contain"
            }}>
                <img width={"100%"} src="/public/imgs/icons/Abastecimento.png" alt="" />
            </Box>

            <Box sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "20px"
            }}>
                <Typography textColor="#fff" level="body-sm">Estado do Abastecimeto</Typography>
                <Typography textColor="#fff" level="h2">Ativo</Typography>
                <Typography textColor="#fff" level="body-xs">01:23:30 para o encerramento</Typography>
            </Box>
        </BaseCard>
    )
}