import React from "react";
import { useSelector } from "react-redux";

const UserPosts = () => {
  const { posts } = useSelector((state) => state.posts);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Posts</h2>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={index} className="border p-4 rounded-md">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>
            <img
              src={post.thumbnail}
              alt="Thumbnail"
              className="mt-2 w-32 h-32 object-cover"
            />
            <p className="text-sm text-gray-500">Author: {post.author}</p>
            <p className="text-sm text-gray-500">
              Created At: {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
