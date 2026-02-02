import { Box, Typography, Avatar } from "@mui/joy";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const authenticatedUser = token ? jwtDecode(token) : null;

  async function handleLogout() {
    try {
      if (token) {
        await fetch("http://localhost:3000/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  if (!authenticatedUser) return null;

  return (
    <Box sx={{ width: "100%", bgcolor: "#111" }}>
      <Box
        sx={{
          height: "15vh",
          width: "80%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h1" sx={{ color: "#fff" }}>
          AquaMonitor
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar />

          <Box>
            <Typography level="body-sm" sx={{ color: "#fff", fontWeight: "bold" }}>
              {authenticatedUser.nome}
            </Typography>
            <Typography level="body-sm" sx={{ color: "#fff" }}>
              {authenticatedUser.tipo === "funcionario" ? "Funcionário" : "Cliente"}
            </Typography>
          </Box>

          <button
            onClick={handleLogout}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <img src="/imgs/icons/Sair da conta.png" alt="Sair" width={24} />
          </button>
        </Box>
      </Box>
    </Box>
  );
}
