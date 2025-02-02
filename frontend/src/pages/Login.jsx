import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import { ROLES } from "../constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Global/Loader";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { login } = useLogin();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loading) return;
    if (user?.isAuthenticated) navigate("/");
  }, [user?.isAuthenticated, loading]);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    login(data);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Role Selection (Radio Buttons) */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <div className="mt-2 space-y-2">
            <Controller
              name="role"
              control={control}
              defaultValue=""
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <>
                  {ROLES.map((role) => (
                    <label key={role} className="flex items-center">
                      <input
                        type="radio"
                        {...field}
                        value={role}
                        checked={field.value === role}
                        className="mr-2"
                      />
                      {role}
                    </label>
                  ))}
                </>
              )}
            />
          </div>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
