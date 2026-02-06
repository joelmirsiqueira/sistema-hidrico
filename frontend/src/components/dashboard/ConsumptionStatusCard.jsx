import { useEffect, useState } from "react";
import BaseCard from "./BaseCard"
import { Box, Typography } from "@mui/joy"

export default function ConsumptionCard() {
    const [ConsumoMensalAtual, setConsumoMensalAtual] = useState(0);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function obterConsumoMensalAtual() {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:3000/cliente/consultar/consumo",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Erro ao obter consumo mensal atual");
                }

                setConsumoMensalAtual(data.consumoAtual);
            } catch (error) {
                setErro(error.message);
                console.log(error.message)
            }
        }

        obterConsumoMensalAtual();
    }, []);

    // useEffect(() => {
    //     console.log(ConsumoMensalAtual);
    // }, [ConsumoMensalAtual]);

    return (
        <BaseCard sx={{
            background:
                `${ConsumoMensalAtual * 10000 > 10000 ?
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
                <img width={"100%"} src="/public/imgs/icons/Consumo.png" alt="" />
            </Box>

            <Box sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "20px"
            }}>
                <Typography textColor="#fff" level="body-sm">Consumo Mensal Atual</Typography>
                <Typography textColor="#fff" level="h2">{ConsumoMensalAtual * 10000}L ou {ConsumoMensalAtual * 10}m³</Typography>
                {/*<Typography textColor="#fff" level="body-xs">▼ 50% mês anterior</Typography>*/}
            </Box>
        </BaseCard>
    )
}