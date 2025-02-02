import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { usePosts } from "../../hooks/usePosts";

const CreatePostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { addAPost } = usePosts();

  const { loading } = useSelector((state) => state.posts);

  const onSubmit = (data) => {
    const newPost = {
      title: data.title,
      content: data.content,
      thumbnail: data.thumbnail || "https://via.placeholder.com/150",
    };
    addAPost(newPost);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Post</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            disabled={loading}
            type="text"
            {...register("title", { required: "Title is required" })}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            {...register("content", { required: "Content is required" })}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.content ? "border-red-500" : "border-gray-300"
            }`}
            rows="4"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Thumbnail URL
          </label>
          <input
            disabled={loading}
            type="url"
            {...register("thumbnail", {
              required: "Thumnbail URL is required",
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i,
                message: "Please enter a valid image URL",
              },
            })}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.thumbnail ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.thumbnail.message}
            </p>
          )}
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {loading ? "submitting..." : "Add Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
