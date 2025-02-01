import React from "react";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
      <h1 className="font-bold text-2xl">Access Denied</h1>
      <p>You dont have suffiecient permission to access this resource.</p>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600"
        onClick={() => navigate("/")}
      >
        Home
      </button>
    </div>
  );
}

export default Unauthorized;
