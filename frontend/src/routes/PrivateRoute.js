import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function PrivateRoute({ children, allowedRoles }) {
  const { user, signed } = useAuth();

  if (!signed) {
    return <Navigate to="/" />;
  }

  // Se a rota exige um papel específico e o usuário não tem
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redireciona para a página inicial correta dele ou uma página de "Não autorizado"
    return <Navigate to={user.role === 'funcionario' ? '/admin/dashboard' : '/portal/home'} />;
  }

  return children;
}
