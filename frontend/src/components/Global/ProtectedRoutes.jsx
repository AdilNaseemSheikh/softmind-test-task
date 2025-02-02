import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "./Loader";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (loading) return <Loader />;

  if (!loading && !user?.isAuthenticated) return navigate("/login");

  if (allowedRoles && !allowedRoles.includes(user?.user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
