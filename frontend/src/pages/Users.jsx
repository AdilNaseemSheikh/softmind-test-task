import React from "react";
import { useSelector } from "react-redux";

const UserList = () => {
  const users = useSelector((state) => state.users.users);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">User List</h2>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {/* Add Pravatar */}
                <img
                  src={`https://i.pravatar.cc/150?img=${user.id}`}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => alert(`Viewing details for ${user.name}`)}
                className="bg-blue-500 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-blue-600"
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
