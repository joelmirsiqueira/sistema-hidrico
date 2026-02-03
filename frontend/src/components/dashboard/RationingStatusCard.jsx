import BaseCard from "./BaseCard"
import { Box, Typography } from "@mui/joy"
import { useEffect, useState } from "react";

export default function RationingStatusCard() {
    const [racionamento, setRacionamento] = useState();
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function buscarRacionamento() {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:3000/cliente/consultar/racionamento", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                );

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || "Erro ao obter status de racionamento");
                }

                setRacionamento(data.racionamento);
            } catch (error) {
                setErro(error.message);
            }
        }

        buscarRacionamento();
    }, []);

    return (
        <BaseCard sx={{
            background:
                `${racionamento === true ? 
                    "linear-gradient(90deg, #ff8a65, #ff7043)" : 
                    "linear-gradient(90deg, #35DEA4, #0EA672)"}`,
            flexDirection: "row"
        }}
        >
            <Box sx={{
                width: "15%",
                height: "100%",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                objectFit: "contain"
            }}>
                <img width={"100%"} src="/public/imgs/icons/Racionamento.png" alt="" />
            </Box>

            <Box sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "20px"
            }}>
                <Typography textColor="#fff" level="body-sm">Estado do Racionamento</Typography>
                <Typography textColor="#fff" level="h2">{racionamento === true ? "Ativo" : "Inativo"}</Typography>
            </Box>
        </BaseCard>
    )
}

