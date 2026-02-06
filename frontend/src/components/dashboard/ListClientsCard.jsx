import { useState } from "react";
import { Box, Typography, Button, } from "@mui/joy";

import BaseCard from "./BaseCard";
import ModalClients from "./ModalClients"

export default function ListClientsCard() {
    const [open, setOpen] = useState(false);
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const [sucesso, setSucesso] = useState(false);

    return (
        <>
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
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px"
                }}>
                    <Typography textColor="#fff" level="h2">CLIENTES</Typography>
                    <Button color="primary" onClick={() => setOpen(true)} sx={{ width: "50%" }}>Acessar Painel</Button>
                </Box>
            </BaseCard>

            <ModalClients
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}