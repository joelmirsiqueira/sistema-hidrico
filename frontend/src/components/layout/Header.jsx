import { Box, Typography, Avatar } from "@mui/joy";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const textFontColor = "#fff";
  const authenticatedUser = jwtDecode(localStorage.getItem("token"));
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      bgcolor: "#111111",
    }}>
      <Box
        sx={{
          height: "15vh",
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h1"
          sx={{
            color: `${textFontColor}`
          }}>
          AquaMonitor
        </Typography>

        <Box sx={{ width: "fit-content", display: "flex", alignItems: "center", justifyContent: "end", gap: 2, }}>
          <Avatar />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography level="body-sm"
              sx={{
                color: "#fff",
                fontWeight: "bold"
              }}>
              {authenticatedUser.nome}
            </Typography>
            <Typography level="body-sm"
              sx={{
                color: "#fff",
              }}>
              {authenticatedUser.tipo === "funcionario" ? "Funcionário" : "Cliente"}
            </Typography>
          </Box>
          <button onClick={function () {
            localStorage.removeItem("token");
            navigate("/")
          }} id="logoutButton" style={{ background: "none", width: "5%", border: "none", cursor: "pointer" }}>
            <img style={{ width: "100%" }} src="/public/imgs/icons/Sair da conta.png" alt="Sair" />
          </button>
        </Box>
      </Box>
    </Box>
  );
}
