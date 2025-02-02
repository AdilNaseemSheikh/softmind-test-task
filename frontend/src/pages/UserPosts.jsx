import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Global/Loader";
import EmptyState from "../components/Global/Empty";
import { usePosts } from "../hooks/usePosts";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UserPosts = () => {
  const { loading } = useSelector((state) => state.posts);
  const [posts, setPosts] = useState([]);

  const { userId } = useParams();

  const { getUsersPosts } = usePosts();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getUsersPosts(userId);

        setPosts(data);
      } catch (error) {
        toast.error(
          error.message || "Something went wrong while getching users post."
        );
      }
    };

    getPosts();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center">Posts List</h2>

        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col md:flex-row items-start p-6 border border-gray-200 rounded-lg"
              >
                {/* Thumbnail */}
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full md:w-32 h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
                />
                {/* Post Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {post.content.length > 100
                      ? `${post.content.substring(0, 100)}...`
                      : post.content}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">By {post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyState message="No post found for this user" />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPosts;
