import React from "react";

const EmptyState = ({ message = "No data was found." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  );
};

export default EmptyState;
