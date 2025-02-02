import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (user && !user?.isAuthenticated) navigate("/login");
  }, [user?.isAuthenticated, loading]);

  if (loading) return <Loader />;

  return children;
};

export default ProtectedRoute;
