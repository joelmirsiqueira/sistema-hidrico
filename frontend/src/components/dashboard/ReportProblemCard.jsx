import BaseCard from "./BaseCard";
import { Box, Typography, Button } from "@mui/joy";
import { useState } from "react";
import ModalReportProblem from "./ModalReportProblem";

export default function ReportProblemCard() {
    const [open, setOpen] = useState(false);
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const [sucesso, setSucesso] = useState(false);

    async function criarRelato(mensagem) {
        try {
            setLoading(true);
            setErro("");
            setSucesso(false);

            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:3000/cliente/criar/relato", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mensagem }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro ao realizar login");
            }

            setSucesso(true);
        } catch (error) {
            setErro(error.message);
        } finally {
            setLoading(false);
        }
    }


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
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px"
                }}>
                    <Typography textColor="#fff" level="h2">VAZAMENTOS OU PROBLEMAS NO ABASTECIMENTO?</Typography>
                    <Button color="danger" onClick={() => setOpen(true)} sx={{ width: "50%" }}>RELATE AQUI</Button>
                </Box>
            </BaseCard>

            <ModalReportProblem
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={(mensagem) => {
                    criarRelato(mensagem);
                }}
                loading={loading}
                erro={erro}
                sucesso={sucesso}
            />
        </>
    );
}