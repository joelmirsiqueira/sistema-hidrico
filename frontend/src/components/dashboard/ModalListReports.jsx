import { useEffect, useState } from "react";
import {
  Modal,
  ModalDialog,
  Typography,
  Box,
  Divider,
  CircularProgress,
  Snackbar,
  Chip,
} from "@mui/joy";

export default function ModalListReports({ open, onClose }) {
  const [relatos, setRelatos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    color: "danger",
  });

  useEffect(() => {
    if (!open) return;

    async function fetchRelatos() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/funcionario/listar/relatos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erro ao listar relatos");
        }

        setRelatos(data);
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

    fetchRelatos();
  }, [open]);

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <ModalDialog
          sx={{
            minWidth: "600px",
            maxWidth: "900px",
          }}
        >
          <Typography level="h4">Relatos dos Clientes</Typography>
          <Divider sx={{ my: 2 }} />

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : relatos.length === 0 ? (
            <Typography>Nenhum relato encontrado.</Typography>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxHeight: "60vh",
                overflowY: "auto",
              }}
            >
              {relatos.map((relato) => (
                <Box
                  key={relato._id}
                  sx={{
                    border: "1px solid",
                    borderColor: "neutral.outlinedBorder",
                    borderRadius: "8px",
                    padding: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography level="title-sm">
                      Cliente ID: {relato.cliente}
                    </Typography>

                    <Chip
                      size="sm"
                      color={relato.status === "resolvido" ? "success" : "warning"}
                    >
                      {relato.status}
                    </Chip>
                  </Box>

                  <Typography level="body-sm">
                    {relato.mensagem}
                  </Typography>

                  <Typography level="body-xs" textColor="neutral.500" sx={{ mt: 1 }}>
                    {new Date(relato.createdAt).toLocaleString("pt-BR")}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </ModalDialog>
      </Modal>

      <Snackbar
        open={snackbar.open}
        color={snackbar.color}
        autoHideDuration={4000}
        onClose={() =>
          setSnackbar((prev) => ({ ...prev, open: false }))
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {snackbar.message}
      </Snackbar>
    </>
  );
}
