import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/auth/useLogin";
import { useRegister } from "../hooks/auth/useRegister";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

const schema = z.object({
  email: z.string(), // later change for email()
  password: z.string().min(4), // later replaced with a more advanced version
});

type FormData = z.infer<typeof schema>;

export const LoginPage = () => {
  const queryClient = useQueryClient();
  const loginMutation = useLogin();
  const isLoginPending = loginMutation.status === "pending";

  const registerMutation = useRegister();
  const isRegisterPending = registerMutation.status === "pending";

  const navigate = useNavigate();

  const {
    reset,
    handleSubmit,
    register: registerField,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onLogin = (data: FormData) => {
    loginMutation.mutate(
      { username: data.email, password: data.password },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          navigate("/home");
        },
        onError: (error) => {
          console.error("Invalid credentials", error);
          toast.error("Invalid credentials");
        },
      }
    );
  };

  const onRegister = (data: FormData) => {
    registerMutation.mutate(
      { username: data.email, password: data.password },
      {
        onSuccess: () => {
          toast.success("Registered! Now log in.");
          reset();
        },

        onError: () => toast.error("User already exists"),
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login Page
        </h1>
        <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Email"
              {...registerField("email")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...registerField("password")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting || isLoginPending}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
          <button
            type="button"
            disabled={isSubmitting || isRegisterPending}
            onClick={handleSubmit(onRegister)}
            className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
