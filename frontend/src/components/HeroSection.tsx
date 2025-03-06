import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Organize Your Day, Master Your Tasks
      </h1>
      <p className="text-lg mb-6">
        Manage tasks efficiently with real-time stats and a beautiful interface.
      </p>
      <div className="space-x-4">
        <Link
          to="/signup"
          className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 bg-transparent border border-white rounded-lg font-semibold hover:bg-white hover:text-blue-600"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
