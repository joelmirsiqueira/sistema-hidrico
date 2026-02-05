import { Modal, ModalDialog, Typography, Textarea, Box, Button } from "@mui/joy";
import { useEffect, useState } from "react";

export default function ModalReportProblem({ open, onClose, onSubmit, loading, erro, sucesso }) {
  useEffect(() => {
    if (sucesso) {
      setMensagem("");
    }
  }, [sucesso]);

  const [mensagem, setMensagem] = useState("");
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{
        minWidth: "400px",
        width: "35%",
        maxWidth: "800px",

      }}>
        <Typography level="h4">Relatar problema</Typography>

        <Textarea className={"mensagem"}
          minRows={5}
          placeholder="Descreva o problema..."
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          sx={{
            overflowX: "hidden",
            overflowY: "scroll",
          }}
        />

        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", alignItems: "center", mt: 2 }}>
          {erro && (
            <Typography color="danger" level="body-sm">
              {erro}
            </Typography>
          )}

          {sucesso && (
            <Typography color="success" level="body-sm">
              Relato enviado com sucesso!
            </Typography>
          )}

          <Button variant="plain" color="neutral" onClick={onClose}>
            Cancelar
          </Button>

          <Button
            color="danger"
            loading={loading}
            disabled={loading}
            onClick={() => onSubmit(mensagem)}
          >
            Enviar
          </Button>
        </Box>
      </ModalDialog>
    </Modal >
  );
}
