import BaseCard from "./BaseCard"
import { Box, Typography } from "@mui/joy"
import { useEffect, useState } from "react";

export default function ReservoirLevelCard() {
    const [nivel, setNivel] = useState(null);
    const [racionamento, setRacionamento] = useState("");
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function buscarNivel() {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:3000/funcionario/consultar/nivel", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                );

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || "Erro ao obter nível do reservatório");
                }

                setNivel(data.capacidade);
                setRacionamento(data.racionamento);
            } catch (error) {
                setErro(error.message);
            }
        }

        buscarNivel();
    }, []);

    return (


        <BaseCard  sx={{ flexDirection: "row",
            background:
                `${racionamento === true ? "linear-gradient(90deg, #ff8a65, #ff7043)" : "linear-gradient(90deg, #35DEA4, #0EA672)"}`,
            color: "#fff",
        }}
        >
            <Box sx={{
                width: "7%",
                height: "100%",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                objectFit: "contain"
            }}>
                <img width={"100%"} src="/public/imgs/icons/Reservatorio.png" alt="" />
            </Box>

            <Box sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "20px"
            }}>
                <Typography textColor={"#fff"} level="body-sm">Nível do Reservatório</Typography>
                <Typography textColor={"#fff"} level="h2">{nivel * 1000}L ou {nivel}m³</Typography>
                <Typography textColor={"#fff"} level="body-sm">Racionamento: {racionamento === true ? "Ativo" : "Inativo"}</Typography>
            </Box>
        </BaseCard>
    )
}