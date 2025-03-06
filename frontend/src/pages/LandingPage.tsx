import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <HeroSection />
      <footer className="bg-teal-400 text-white py-6 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; 2025 Task Manager. Made with ❤️ for productivity enthusiasts.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
