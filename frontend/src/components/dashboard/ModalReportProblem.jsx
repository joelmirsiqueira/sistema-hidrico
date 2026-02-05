import { Modal, ModalDialog, Typography, Textarea, Box, Button } from "@mui/joy";
import { useState } from "react";

export default function ModalReportProblem({ open, onClose, onSubmit }) {
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

        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
          <Button variant="plain" color="neutral" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              onSubmit(mensagem)
              setMensagem("");
            }
            }
          >
            Enviar
          </Button>
        </Box>
      </ModalDialog>
    </Modal >
  );
}
