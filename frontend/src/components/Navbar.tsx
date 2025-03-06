import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth) return null;
  const { user, logout } = auth;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-teal-400 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold tracking-wide">
          Task Manager
        </Link>
        <div className="space-x-6">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-white hover:text-teal-100 transition duration-300"
              >
                Dashboard
              </Link>
              <Link
                to="/tasks"
                className="text-white hover:text-teal-100 transition duration-300"
              >
                Tasks
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-teal-100 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-teal-100 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white hover:text-teal-100 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
