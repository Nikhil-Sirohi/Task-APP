import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import DashboardPage from "../pages/DashboardPage";
import TasksPage from "../pages/TasksPage";
import TaskDetailPage from "../pages/TaskDetailPage";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../hooks/useAuth";

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <LandingPage />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute component={DashboardPage} />}
      />
      <Route path="/tasks" element={<ProtectedRoute component={TasksPage} />} />
      <Route
        path="/tasks/:id"
        element={<ProtectedRoute component={TaskDetailPage} />}
      />
    </Routes>
  );
};

export default AppRoutes;
