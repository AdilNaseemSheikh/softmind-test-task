import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { setLoading, setUser } from "../redux/slices/authSlice";
import { BASE_URL } from "../constants";

export const useAuth = () => {
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      dispatch(setLoading(true));

      const res = await fetch(`${BASE_URL}/auth/`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      dispatch(setUser({ user: data, loading: false }));
    } catch (error) {
      toast.error(error.message || "Unable to get users data");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { getUser };
};
