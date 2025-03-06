import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  component: React.FC;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
}) => {
  const { token } = useAuth();

  return token ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
