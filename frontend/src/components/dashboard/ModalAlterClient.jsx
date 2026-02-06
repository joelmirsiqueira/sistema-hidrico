import { useEffect, useState } from "react";
import { Modal, ModalDialog, Typography, Box, Button, Divider, Input, FormControl, FormLabel, Alert, Snackbar } from "@mui/joy";

export default function ModalAlterClient({ open, onClose, cliente }) {
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        color: "success",
    });

    const [form, setForm] = useState({
        nome: "",
        email: "",
        comporta: "",
        rua: "",
        numero: "",
        bairro: "",
    });

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

    async function handleSubmit() {

        const camposObrigatorios = [
            "nome",
            "email",
            "comporta",
            "rua",
            "numero",
            "bairro",
        ];

        for (const campo of camposObrigatorios) {
            if (!form[campo] || form[campo].toString().trim() === "") {
                setSnackbar({
                    open: true,
                    message: "Preencha todos os campos obrigatórios.",
                    color: "danger",
                });
                return;
            }
        }

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const payload = {
                nome: form.nome,
                email: form.email,
                comporta: form.comporta,
                endereco: {
                    rua: form.rua,
                    numero: Number(form.numero),
                    bairro: form.bairro,
                },
            };

            const response = await fetch(
                `http://localhost:3000/funcionario/atualizar/cliente/${cliente._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro ao atualizar cliente");
            }

            setSnackbar({
                open: true,
                message: "Cliente atualizado com sucesso!",
                color: "success",
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.message,
                color: "danger",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
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
                            <Input required
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                placeholder="Ex: João Silva"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>E-mail</FormLabel>
                            <Input required
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="cliente@email.com"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Comporta</FormLabel>
                            <Input required
                                disabled
                                name="comporta"
                                value={form.comporta}
                                onChange={handleChange}
                                placeholder="Ex: C-12"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Rua</FormLabel>
                            <Input required
                                name="rua"
                                value={form.rua}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Número</FormLabel>
                            <Input required
                                name="numero"
                                value={form.numero}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Bairro</FormLabel>
                            <Input required
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
            <Snackbar
                open={snackbar.open}
                color={snackbar.color}
                variant="solid"
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                sx={{
                    zIndex: 1500,
                }}
            >
                {snackbar.message}
            </Snackbar>
        </>
    );
}