import '@fontsource/inter';
import '../../styles/fonts.css'
import {
  Box,
  Button,
  Card,
  Input,
  Typography
} from "@mui/joy";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top, #1f2a4a, #0b1020)",
      }}
    >
      <Card
        sx={{
          width: "26vw",
          maxWidth: 600,
          minWidth: 250,
          height: "46vh",
          maxHeight: 500,
          minHeight: 250,
          padding: 4,
          boxShadow: "lg",
          borderRadius: "md",
          display: "flex",
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          level="h1"
          textAlign="center"
          fontFamily={"Mona Sans Expanded Bold"}
          sx={{ color: "#2D2F52" }}
        >
          Olá!
        </Typography>

        <Typography
          fontFamily={"Mona Sans Condensed"}
          level="body-sm"
          textAlign="center"
          color="#2D2F52"
          sx={{ color: "#2D2F52" }}
        >
          Faça seu login para continuar!
        </Typography>

        <Input
          placeholder="exemplo@email.com"
          type="email"
          sx={{
            width: "80%"
          }}
        />
        <Input
          placeholder="senha"
          type="password"
          sx={{
            width: "80%"
          }}
        />

        <Button
        onClick={
          () => navigate("/client")
        }
          sx={{
            backgroundColor: "#41B576",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "#2b794e"
            },
            width: "80%"
          }}
        >
          Entrar
        </Button>
      </Card>
    </Box>
  );
}

export default Login;
