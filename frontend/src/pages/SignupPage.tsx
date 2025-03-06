import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";

interface SignupForm {
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<SignupForm>();

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    try {
      await signup(data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Navbar />
      <div className="absolute top-20 w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              {...register("password", { required: true, minLength: 8 })}
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition duration-300 shadow-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
