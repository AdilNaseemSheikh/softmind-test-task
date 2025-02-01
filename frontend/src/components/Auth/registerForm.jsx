import React from "react";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("User Registered:", data);
  };

  const selectedRole = watch("role");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register a Member
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
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
            Role
          </label>
          <select
            {...register("role", { required: "Role is required" })}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.role ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
            <option value="user">User</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>
        {selectedRole === "superadmin" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Security Key
            </label>
            <input
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
          type="submit"
          className="w-full cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
