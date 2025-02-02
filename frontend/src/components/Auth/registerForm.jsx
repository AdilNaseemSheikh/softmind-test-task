import React from "react";
import { useForm } from "react-hook-form";
import { useUsers } from "../../hooks/useUsers";
import { useSelector } from "react-redux";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { addAUser } = useUsers();

  const { loading } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    await addAUser(data);
    reset();
  };

  const selectedRole = watch("role");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 sm:p-8 rounded-lg shadow-md mx-5 w-full sm:max-w-md max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register a Member
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            disabled={loading}
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            disabled={loading}
            type="email"
            {...register("email", { required: "Email is required" })}
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
            disabled={loading}
            type="password"
            {...register("password", { required: "Password is required" })}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            {...register("role", { required: "Role is required" })}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.role ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a role</option>
            <option value="user">User</option>

            {user?.user?.role === "super-admin" && (
              <>
                <option value="admin">Admin</option>
                <option value="super-admin">Super Admin</option>
              </>
            )}
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>
        {selectedRole === "super-admin" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Security Key
            </label>
            <input
              disabled={loading}
              type="password"
              {...register("securityKey", {
                required: "Security Key is required for Super Admin",
              })}
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.securityKey ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.securityKey && (
              <p className="text-red-500 text-sm mt-1">
                {errors.securityKey.message}
              </p>
            )}
          </div>
        )}
        <button
          disabled={loading}
          type="submit"
          className="w-full cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {loading ? "submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
