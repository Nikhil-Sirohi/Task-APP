import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-teal-200 via-blue-200 to-purple-200 text-gray-800 py-24 text-center">
      <h1 className="text-5xl font-extrabold mb-6 animate-fade-in">
        Organize Your Day, Master Your Tasks
      </h1>
      <p className="text-xl mb-8 text-gray-600">
        Manage tasks efficiently with real-time stats and a stunning interface.
      </p>
      <div className="space-x-6">
        <Link
          to="/signup"
          className="px-8 py-4 bg-teal-400 text-white rounded-full font-semibold hover:bg-teal-500 transition duration-300 shadow-md"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="px-8 py-4 bg-transparent border-2 border-teal-400 text-teal-400 rounded-full font-semibold hover:bg-teal-400 hover:text-white transition duration-300 shadow-md"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
