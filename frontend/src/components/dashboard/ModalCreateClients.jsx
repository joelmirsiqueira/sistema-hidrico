import { useState } from "react";
import {
    Modal,
    ModalDialog,
    Typography,
    Box,
    Button,
    Divider,
    Input,
    FormControl,
    FormLabel,
    Alert,
} from "@mui/joy";

export default function ModalCreateClients({ open, onClose, onSuccess }) {
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: "",
        codigoCliente: "",
        comporta: "",
        rua: "",
        numero: "",
        bairro: "",
    });

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
            "senha",
            "codigoCliente",
            "comporta",
            "rua",
            "numero",
            "bairro",
        ];

        for (const campo of camposObrigatorios) {
            if (!form[campo] || form[campo].toString().trim() === "") {
                setErro("Preencha todos os campos obrigatórios.");
                return;
            }
        }

        try {
            setErro("");
            setSucesso("");
            setLoading(true);

            const token = localStorage.getItem("token");

            const payload = {
                nome: form.nome,
                email: form.email,
                senha: form.senha,
                codigoCliente: Number(form.codigoCliente),
                comporta: form.comporta,
                endereco: {
                    rua: form.rua,
                    numero: Number(form.numero),
                    bairro: form.bairro,
                },
            };

            const response = await fetch(
                "http://localhost:3000/funcionario/criar/cliente",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro ao criar cliente");
            }

            setSucesso("Cliente criado com sucesso!");

            onSuccess?.();
        } catch (error) {
            setErro(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog sx={{ width: "50%", maxWidth: 800 }}>
                <Typography level="h4">Criar novo cliente</Typography>

                <Divider />

                <Box
                    sx={{
                        width: "80%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                        alignSelf: "center",
                        overflow: "scroll"
                    }}
                >
                    <FormControl>
                        <FormLabel>Nome</FormLabel>
                        <Input required name="nome" value={form.nome} onChange={handleChange} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>E-mail</FormLabel>
                        <Input required name="email" value={form.email} onChange={handleChange} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Senha</FormLabel>
                        <Input required
                            type="password"
                            name="senha"
                            value={form.senha}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Código do Cliente</FormLabel>
                        <Input required
                            name="codigoCliente"
                            value={form.codigoCliente}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Comporta</FormLabel>
                        <Input required
                            name="comporta"
                            value={form.comporta}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Rua</FormLabel>
                        <Input required name="rua" value={form.rua} onChange={handleChange} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Número</FormLabel>
                        <Input required name="numero" value={form.numero} onChange={handleChange} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Bairro</FormLabel>
                        <Input required name="bairro" value={form.bairro} onChange={handleChange} />
                    </FormControl>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                    {erro && <Alert color="danger">{erro}</Alert>}
                    {sucesso && <Alert color="success">{sucesso}</Alert>}

                    <Button variant="plain" onClick={onClose}>
                        Cancelar
                    </Button>

                    <Button loading={loading} onClick={handleSubmit}>
                        Criar cliente
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    );
}
