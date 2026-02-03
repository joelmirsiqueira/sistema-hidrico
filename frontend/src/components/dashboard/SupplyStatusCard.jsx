
import BaseCard from "./BaseCard"
import { Box, Typography } from "@mui/joy"
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function SupplyStatusCard() {

    const [estadoComporta, setEstadoComporta] = useState();
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function obterEstadoComporta() {
            try {
                const token = localStorage.getItem("token");
                const authenticatedUser = jwtDecode(token);
                const gateID = authenticatedUser.comporta;

                const response = await fetch(
                    `http://localhost:3000/cliente/consultar/comporta/${gateID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                );

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || "Erro ao obter status do abastecimento");
                }

                setEstadoComporta(data.status === "on" ? "Ativo" : "Inativo");
            } catch (error) {
                setErro(error.message);
            }
        }

        obterEstadoComporta();
    }, []);

    return (
        <BaseCard sx={{ 
            background:
                `${estadoComporta === "Inativo" ? 
                    "linear-gradient(90deg, #ff8a65, #ff7043)" : 
                    "linear-gradient(90deg, #35DEA4, #0EA672)"}`, flexDirection: "row" }}>
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
                <Typography textColor="#fff" level="h2">{estadoComporta}</Typography>
            </Box>
        </BaseCard>
    )
}