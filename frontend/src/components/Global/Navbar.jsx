import React from "react";
import { NavLink } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { logout } = useLogout();

  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="bg-blue-500 p-4">
      <div className="mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl"></div>
        <ul className="flex space-x-4 items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-bold"
                  : "text-gray-200 hover:text-white"
              }
            >
              Home
            </NavLink>
          </li>

          {/* {user?.user?.role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-bold"
                      : "text-gray-200 hover:text-white"
                  }
                >
                  Users
                </NavLink>
              </li>
            </>
          )} */}

          {user?.user?.role === "admin" && (
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-gray-200 hover:text-white"
                }
              >
                Add a Member
              </NavLink>
            </li>
          )}

          {user?.user?.role === "user" && (
            <li>
              <NavLink
                to="/create-post"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-gray-200 hover:text-white"
                }
              >
                Create Post
              </NavLink>
            </li>
          )}

          <li>
            <button
              onClick={logout}
              className="px-2 border rounded cursor-pointer bg-blue-500 text-white py-1 hover:bg-blue-600"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
