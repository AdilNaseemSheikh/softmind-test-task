import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostsList = () => {
  const posts = useSelector((state) => state.posts.posts);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-center">Posts List</h2>
          <button
            onClick={() => navigate("/create-post")}
            className="bg-blue-500 cursor-pointer text-white py-1 px-2 rounded-md hover:bg-blue-600"
          >
            Add Post
          </button>
        </div>
        <div className="space-y-6">
          {posts.map((post) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsList;
