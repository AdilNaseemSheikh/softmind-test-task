import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addPost, setLoading, setPosts } from "../redux/slices/postsSlice";
import { BASE_URL } from "../constants";

export const usePosts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPosts = async () => {
    try {
      dispatch(setLoading(true));

      const res = await fetch(`${BASE_URL}/posts`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      dispatch(setPosts(data.posts));
    } catch (error) {
      toast.error(error.message || "Something went wrong while fetching posts");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const addAPost = async ({ title, content, thumbnail }) => {
    try {
      dispatch(setLoading(true));

      const res = await fetch(`${BASE_URL}/posts/`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          thumbnail,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Post Created");
      dispatch(addPost(data.post));
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Something went wrong while fetching posts");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getUsersPosts = async (userId) => {
    try {
      dispatch(setLoading(true));

      const res = await fetch(`${BASE_URL}/posts/user/${userId}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      return data.posts;
    } catch (error) {
      toast.error(error.message || "Something went wrong while fetching posts");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { getPosts, addAPost, getUsersPosts };
};
