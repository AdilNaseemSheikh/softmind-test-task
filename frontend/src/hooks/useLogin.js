import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { setLoading, setUser } from "../redux/slices/authSlice";
import { BASE_URL } from "../constants";

export const useLogin = () => {
  const dispatch = useDispatch();

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

      dispatch(setUser({ user: data, loading: false }));
    } catch (error) {
      toast.error(error.message || "Something went wrong during login");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { login };
};
