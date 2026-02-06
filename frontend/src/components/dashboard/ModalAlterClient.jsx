import { useEffect, useState } from "react";
import { Modal, ModalDialog, Typography, Box, Button, Divider, Input, FormControl, FormLabel } from "@mui/joy";

export default function ModalAlterClient({ open, onClose, cliente }) {
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
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignSelf: "center",
                    gap: "10px"

                }}>
                    <FormControl>
                        <FormLabel>Nome do cliente</FormLabel>
                        <Input
                            name="nome"
                            value={form.nome}
                            onChange={handleChange}
                            placeholder="Ex: João Silva"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>E-mail</FormLabel>
                        <Input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="cliente@email.com"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Comporta</FormLabel>
                        <Input
                            name="comporta"
                            value={form.comporta}
                            onChange={handleChange}
                            placeholder="Ex: C-12"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Rua</FormLabel>
                        <Input
                            name="rua"
                            value={form.rua}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Número</FormLabel>
                        <Input
                            name="numero"
                            value={form.numero}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Bairro</FormLabel>
                        <Input
                            name="bairro"
                            value={form.bairro}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                    <Button variant="plain" onClick={onClose}>
                        Cancelar
                    </Button>

                    <Button color="primary" onClick={handleSubmit}>
                        {cliente ? "Salvar alterações" : "Criar cliente"}
                    </Button>
                </Box>
            </ModalDialog>
        </Modal >
    );
}