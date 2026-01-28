import { Box, Typography, Avatar } from "@mui/joy";
import { jwtDecode } from "jwt-decode";

export default function Header() {
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

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar />
          <Box sx={{display: "flex", flexDirection: "column"}}>
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
        </Box>
      </Box>
    </Box>
  );
}
