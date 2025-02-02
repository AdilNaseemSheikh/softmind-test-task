import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { BASE_URL } from "../constants";
import { addUser, setLoading, setUsers } from "../redux/slices/usersSlice";

export const useUsers = () => {
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      dispatch(setLoading(true));

      const res = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      dispatch(setUsers(data.users));
    } catch (error) {
      toast.error(error.message || "Something went wrong while fetching users");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const addAUser = async ({ name, email, password, role, securityKey }) => {
    let url = `${BASE_URL}/users/`;

    const body = { email, password, role, name };

    if (role === "super-admin") {
      url += "create-super-admin";
      body.securityKey = securityKey;
    }

    try {
      dispatch(setLoading(true));

      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Member Added");

      dispatch(addUser(data.user));
    } catch (error) {
      toast.error(
        error.message || "Something went wrong while Adding a member"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { getUsers, addAUser };
};
