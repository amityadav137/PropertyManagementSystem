import AuthService from "../../services/AuthService"
import { useLocation,Navigate } from 'react-router-dom'

export default function RequireAuth({ children }) {
    const location = useLocation();

    const isAuthenticated  = AuthService.isAuthenticated();
  
    return isAuthenticated === true ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }