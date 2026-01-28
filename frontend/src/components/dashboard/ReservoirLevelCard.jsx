import BaseCard from "./BaseCard"
import { Typography } from "@mui/joy"
import { useEffect, useState } from "react";

export default function ReservoirLevelCard() {
    const [nivel, setNivel] = useState(null);
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
            } catch (error) {
                setErro(error.message);
            }
        }

        buscarNivel();
    }, []);

    return (
        <BaseCard sx={{ bgcolor: "#ffc934", color: "#fff" }}>
            <Typography level="body-sm">Nível do Reservatório</Typography>
            <Typography level="h2">{nivel*1000}L ou {nivel}m³</Typography>
        </BaseCard>
    )
}