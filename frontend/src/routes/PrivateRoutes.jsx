import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function PrivateRoute({ children, allowedRoles }) {
    const token = localStorage.getItem("token");
    const authenticatedUser = jwtDecode(token);

    // Não está logado
    if (!token || !authenticatedUser) {
        return <Navigate to="/" replace />;
    }

    // Não tem permissão
    if (!allowedRoles.includes(authenticatedUser.tipo)) {
        return <Navigate to="/" replace />;
    }

    return children;
}
