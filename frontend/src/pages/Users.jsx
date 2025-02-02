import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Global/Loader";
import { useUsers } from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const { users, loading } = useSelector((state) => state.users);

  const { getUsers } = useUsers();

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md mx-5 w-full sm:max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">User List</h2>
        <div className="space-y-4">
          {users.map((user, i) => (
            <div
              key={user.id}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {/* Add Pravatar */}
                <img
                  src={`https://i.pravatar.cc/150?img=${i}`}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/posts/${user.id}`)}
                className="bg-blue-500 cursor-pointer text-white py-1 px-2 rounded-md hover:bg-blue-600 sm:py-2 sm:px-4 text-sm sm:text-lg"
              >
                View Detail
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
