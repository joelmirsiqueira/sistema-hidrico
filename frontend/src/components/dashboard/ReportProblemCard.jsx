import BaseCard from "./BaseCard"
import { Box, Typography, Button } from "@mui/joy"

export default function ReportProblemCard() {
    return (
        <BaseCard sx={{
            width: "35%",
            padding: "30px",
            background: "linear-gradient(90deg, #14223D, #17171A)",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
        }}
        >
            <Box sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px"
            }}>
                <Typography textColor="#fff" level="h2">VAZAMENTOS OU PROBLEMAS NO ABASTECIMENTO?</Typography>
                <Button color="danger" sx={{width: "50%"}}>RELATE AQUI</Button>
            </Box>
        </BaseCard>
    )
}