import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { setLoading, setUser } from "../redux/slices/authSlice";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async ({ email, password, role }) => {
    try {
      dispatch(setLoading(true));

      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      dispatch(setUser({ user: data.data.user, isAuthenticated: true }));

      navigate("/");
    } catch (error) {
      toast.error(error.message || "Something went wrong during login");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { login };
};
