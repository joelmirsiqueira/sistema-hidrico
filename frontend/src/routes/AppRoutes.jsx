import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import ClientDashboard from "../pages/client/ClientDashboard";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import PrivateRoute from "./PrivateRoutes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Cliente */}
        <Route
          path="/client"
          element={
            <PrivateRoute allowedRoles={["cliente"]}>
              <ClientDashboard />
            </PrivateRoute>
          }
        />

        {/* Funcionário */}
        <Route
          path="/employee"
          element={
            <PrivateRoute allowedRoles={["funcionario"]}>
              <EmployeeDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
