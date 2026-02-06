import { useEffect, useState } from "react";
import {
    Modal,
    ModalDialog,
    Typography,
    Tooltip,
    Box,
    Divider,
    List,
    ListItem,
    ListItemContent,
    ListDivider,
    Snackbar,
    Button,
} from "@mui/joy";

import ModalCreateClients from "./ModalCreateClients";
import ModalAlterClient from "./ModalAlterClient";

export default function ModalClients({ open, onClose }) {
    const [listaDeClientes, setListaDeClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);

    const [openCreateClient, setOpenCreateClient] = useState(false);
    const [openAlterClient, setOpenAlterClient] = useState(false);
    const [openConfirmReset, setOpenConfirmReset] = useState(false);

    const [clienteParaReset, setClienteParaReset] = useState(null);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        color: "success",
    });

    async function listarClientes() {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:3000/funcionario/listar/clientes",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro ao listar clientes");
            }

            setListaDeClientes(data);
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.message,
                color: "danger",
            });
        }
    }

    useEffect(() => {
        if (open) {
            listarClientes();
        }
    }, [open]);

    async function resetarSenhaCliente() {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3000/funcionario/resetar/senha/${clienteParaReset}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro ao resetar senha");
            }

            setSnackbar({
                open: true,
                message: "Senha resetada com sucesso. Nova senha = e-mail do cliente.",
                color: "success",
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.message,
                color: "danger",
            });
        } finally {
            setOpenConfirmReset(false);
            setClienteParaReset(null);
        }
    }

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <ModalDialog
                    sx={{
                        minWidth: 400,
                        width: "50%",
                        maxWidth: 800,
                    }}
                >
                    <Typography level="h4">Clientes</Typography>

                    <Divider />

                    <List
                        sx={{
                            width: "100%",
                            bgcolor: "background.surface",
                            maxHeight: "70vh",
                            overflowY: "auto",
                            mt: 1,
                        }}
                    >
                        {listaDeClientes.map((cliente, index) => (
                            <Box key={cliente.codigoCliente}>
                                <ListItem
                                    endAction={
                                        <Box sx={{ display: "flex", gap: 1 }}>
                                            <Tooltip title="Alterar cliente">
                                                <Box
                                                    sx={{ width: 28, cursor: "pointer" }}
                                                    onClick={() => {
                                                        setClienteSelecionado(cliente);
                                                        setOpenAlterClient(true);
                                                    }}
                                                >
                                                    <img
                                                        width="100%"
                                                        src="/imgs/icons/Alterar.png"
                                                        alt="Alterar"
                                                    />
                                                </Box>
                                            </Tooltip>

                                            <Tooltip title="Restaurar senha">
                                                <Box
                                                    sx={{ width: 28, cursor: "pointer" }}
                                                    onClick={() => {
                                                        setClienteParaReset(cliente._id);
                                                        setOpenConfirmReset(true);
                                                    }}
                                                >
                                                    <img
                                                        width="100%"
                                                        src="/imgs/icons/Restaurar senha.png"
                                                        alt="Resetar senha"
                                                    />
                                                </Box>
                                            </Tooltip>
                                        </Box>
                                    }
                                >
                                    <ListItemContent>
                                        <Typography level="title-sm">
                                            {cliente.nome}
                                        </Typography>

                                        <Typography level="body-xs">
                                            <strong>ID:</strong> {cliente.codigoCliente}
                                        </Typography>

                                        <Typography level="body-xs">
                                            <strong>E-mail:</strong> {cliente.email}
                                        </Typography>

                                        <Typography level="body-xs">
                                            <strong>Comporta:</strong> {cliente.comporta}
                                        </Typography>

                                        <Typography level="body-xs">
                                            <strong>Endereço:</strong>{" "}
                                            {`${cliente.endereco.rua}, ${cliente.endereco.numero}, ${cliente.endereco.bairro}`}
                                        </Typography>
                                    </ListItemContent>
                                </ListItem>

                                {index < listaDeClientes.length - 1 && (
                                    <ListDivider />
                                )}
                            </Box>
                        ))}
                    </List>

                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <Tooltip title="Criar novo cliente">
                            <Box
                                sx={{ width: 32, cursor: "pointer" }}
                                onClick={() => setOpenCreateClient(true)}
                            >
                                <img
                                    width="100%"
                                    src="/imgs/icons/Novo Usuário.png"
                                    alt="Novo cliente"
                                />
                            </Box>
                        </Tooltip>
                    </Box>
                </ModalDialog>
            </Modal>

            {/* Modal Criar */}
            <ModalCreateClients
                open={openCreateClient}
                onClose={() => setOpenCreateClient(false)}
                onSuccess={() => {
                    setOpenCreateClient(false);
                    listarClientes();
                }}
            />

            {/* Modal Alterar */}
            <ModalAlterClient
                cliente={clienteSelecionado}
                open={openAlterClient}
                onClose={() => {
                    setOpenAlterClient(false);
                    setClienteSelecionado(null);
                }}
            />

            {/* Modal Confirmação Reset */}
            <Modal
                open={openConfirmReset}
                onClose={() => setOpenConfirmReset(false)}
            >
                <ModalDialog>
                    <Typography level="h4">Confirmar ação</Typography>

                    <Divider />

                    <Typography level="body-sm" sx={{ mt: 1 }}>
                        Tem certeza que deseja restaurar a senha deste cliente?
                        <br />
                        A nova senha será o e-mail do usuário.
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1,
                            mt: 2,
                        }}
                    >
                        <Button
                            variant="plain"
                            onClick={() => setOpenConfirmReset(false)}
                        >
                            Cancelar
                        </Button>

                        <Button color="danger" onClick={resetarSenhaCliente}>
                            Confirmar
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>

            {/* Snackbar global */}
            <Snackbar
                open={snackbar.open}
                color={snackbar.color}
                variant="solid"
                autoHideDuration={4000}
                onClose={() =>
                    setSnackbar((prev) => ({ ...prev, open: false }))
                }

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
