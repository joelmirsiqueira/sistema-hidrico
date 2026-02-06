import { useEffect, useState } from "react";
import { Modal, ModalDialog, Typography, Textarea, Tooltip, Box, Button, Divider, List, ListItem, ListItemContent, ListDivider } from "@mui/joy";

export default function ModalCreateClients({ open, onClose, cliente }) {
    const [erro, setErro] = useState("");

    const [form, setForm] = useState({
        nome: "",
        email: "",
        comporta: "",
        rua: "",
        numero: "",
        bairro: "",
    });

    // Preenche o form quando editar
    useEffect(() => {
        if (!cliente) {
            setForm({
                nome: "",
                email: "",
                comporta: "",
                rua: "",
                numero: "",
                bairro: "",
            });
            return;
        }

        setForm({
            nome: cliente.nome ?? "",
            email: cliente.email ?? "",
            comporta: cliente.comporta ?? "",
            rua: cliente.endereco?.rua ?? "",
            numero: cliente.endereco?.numero ?? "",
            bairro: cliente.endereco?.bairro ?? "",
        });
    }, [cliente]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit() {
        const payload = {
            nome: form.nome,
            email: form.email,
            comporta: form.comporta,
            endereco: {
                rua: form.rua,
                numero: form.numero,
                bairro: form.bairro,
            },
        };

        console.log("Payload:", payload);
        onClose();
    }

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog sx={{
                minWidth: "400px",
                width: "50%",
                maxWidth: "800px",

            }}>
                <Typography level="h4">Alterar dados do cliente</Typography>

                <Divider />

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",

                }}>




                </Box>
            </ModalDialog>
        </Modal >
    );
}