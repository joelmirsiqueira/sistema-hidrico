import { useEffect, useState } from "react";
import { Modal, ModalDialog, Typography, Tooltip, Box, Divider, List, ListItem, ListItemContent, ListDivider } from "@mui/joy";
import ModalCreateClients from "./ModalCreateClients";
import ModalAlterClient from "./ModalAlterClient";

export default function ModalClients({ open, onClose, onSubmit }) {
    const [listaDeClientes, setlistaDeClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [openCreateClient, setOpenCreateClient] = useState(false);
    const [openAlterClient, setOpenAlterClient] = useState(false);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function listarClientes() {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:3000/funcionario/listar/clientes", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
                );

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || "Erro ao obter listar clientes.");
                }

                setlistaDeClientes(data);
            } catch (error) {
                setErro(error.message);
            }
        }

        listarClientes();
    }, []);

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog sx={{
                minWidth: "400px",
                width: "50%",
                maxWidth: "800px",

            }}>
                <Typography level="h4">Clientes</Typography>

                <Divider />

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px"
                }}>

                    <List sx={{ width: "100%", bgcolor: "background.surface", maxHeight: "70vh", overflowY: "scroll"}}>
                        {listaDeClientes.map((cliente, index) => (
                            <Box key={cliente.codigoCliente}>
                                <ListItem
                                    endAction={
                                        <Box sx={{ display: "flex", gap: 1 }}>
                                            <Tooltip arrow title="Alterar cliente" variant="outlined">
                                                <Box
                                                    sx={{ width: "2rem", cursor: "pointer" }}
                                                    onClick={() => {
                                                        setClienteSelecionado(cliente);
                                                        setOpenAlterClient(true);
                                                    }}
                                                >
                                                    <img width="100%" src="/imgs/icons/Alterar.png" alt="Alterar" />
                                                </Box>
                                            </Tooltip>

                                            <Tooltip arrow title="Restaurar senha" variant="outlined">
                                                <Box
                                                    sx={{ width: "2rem", cursor: "pointer" }}
                                                    onClick={() => console.log("Resetar senha", cliente.codigoCliente)}
                                                >
                                                    <img width="100%" src="/imgs/icons/Restaurar senha.png" alt="Resetar senha" />
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
                                            <strong>Endereço:</strong> {cliente.endereco.rua + ", " + cliente.endereco.numero + ", " + cliente.endereco.bairro}
                                        </Typography>
                                    </ListItemContent>
                                </ListItem>

                                {index < listaDeClientes.length - 1 && <ListDivider />}
                            </Box>
                        ))}
                    </List>

                    <Tooltip arrow title={"Criar novo usuário"} variant="outlined">
                        <Box onClick={() => {
                            setClienteSelecionado(null)
                            setOpenCreateClient(true)
                        }
                        } sx={{
                            width: "2rem",
                            cursor: "pointer",
                        }}>
                            <img width={"100%"} src="/imgs/icons/Novo Usuário.png" alt="" />
                        </Box>
                    </Tooltip>
                </Box>

                <ModalCreateClients
                    open={openCreateClient}
                    onClose={() => setOpenCreateClient(false)}
                    onSuccess={() => {
                        setOpenCreateClient(false);
                        listarClientes();
                    }}
                />

                <ModalAlterClient
                    cliente={clienteSelecionado}
                    open={openAlterClient}
                    onClose={() => {
                        setOpenAlterClient(false)
                        setClienteSelecionado(null)
                    }}
                />
            </ModalDialog>
        </Modal >
    );
}