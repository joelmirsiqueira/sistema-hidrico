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
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleLogin() {
    setErro("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao realizar login");
      }

      // Salvar token
      localStorage.setItem("token", data.token);

      const authenticatedUser = jwtDecode(localStorage.getItem("token"));
      // Redirecionar conforme tipo
      if (authenticatedUser.tipo === "funcionario") {
        navigate("/employee");
      } else {
        navigate("/client");
      }
    } catch (error) {
      setErro(error.message);
    }
  }

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            width: "80%"
          }}
        />
        <Input
          placeholder="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          sx={{
            width: "80%"
          }}
        />

        {erro && (
          <Typography color="danger" level="body-sm">
            {erro}
          </Typography>
        )}
        <Button
          onClick={handleLogin}
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