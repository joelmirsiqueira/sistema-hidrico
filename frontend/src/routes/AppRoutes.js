import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/Login';
import { ClientDashboard } from '../pages/Client/Dashboard';
import { EmployeeDashboard } from '../pages/Employee/Monitor';
import { PrivateRoute } from './PrivateRoute';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rota Pública */}
      <Route path="/" element={<Login />} />

      {/* Rotas de Cliente */}
      <Route 
        path="/portal/*" 
        element={
          <PrivateRoute allowedRoles={['cliente']}>
            <ClientDashboard />
          </PrivateRoute>
        } 
      />

      {/* Rotas de Funcionário */}
      <Route 
        path="/admin/*" 
        element={
          <PrivateRoute allowedRoles={['funcionario']}>
            <EmployeeDashboard />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}
