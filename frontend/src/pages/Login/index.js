import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api'; // Axios configurado

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Backend deve retornar: { token: '...', user: { name: '...', role: 'funcionario' } }
      const response = await api.post('/login', { email, password });
      
      const { token, user } = response.data;
      
      // Salva no contexto
      signIn({ token, ...user });

      // LÓGICA DE DECISÃO
      if (user.role === 'funcionario') {
        navigate('/admin/dashboard'); // Área do Funcionário
      } else {
        navigate('/portal/home');     // Área do Cliente
      }

    } catch (error) {
      alert('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Inputs de email e senha */}
      <button type="submit">Entrar</button>
    </form>
  );
}
