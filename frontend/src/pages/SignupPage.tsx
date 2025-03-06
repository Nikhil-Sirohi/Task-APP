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
    console.log("Form submitted:", data);
    try {
      await signup(data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              {...register("password", { required: true, minLength: 8 })}
              type="password"
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
