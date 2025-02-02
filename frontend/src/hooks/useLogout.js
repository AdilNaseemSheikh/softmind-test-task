import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUser } from "../redux/slices/authSlice";
import { BASE_URL } from "../constants";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      dispatch(setUser(null));
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Something went wrong during logout");
    }
  };

  return { logout };
};
