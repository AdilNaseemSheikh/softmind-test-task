import { toast } from "react-hot-toast";

import { BASE_URL } from "../constants";

export const useAuth = async () => {
  try {
    const res = await fetch(`${BASE_URL}/auth/`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    toast.error(error.message || "Unable to get users data");
  }
};
