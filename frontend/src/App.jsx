import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./components/Auth/registerForm";
import ProtectedRoute from "./components/Global/ProtectedRoutes";
import CreatePost from "./components/Posts/createPostForm";
import { useAuth } from "./hooks/useAuth";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import UserPosts from "./pages/UserPosts";
import Users from "./pages/Users";
import { authenticate } from "./redux/slices/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={["user", "admin", "super-admin"]}>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/register"
              element={
                <ProtectedRoute allowedRoles={["admin", "super-admin"]}>
                  <Register />
                </ProtectedRoute>
              }
            />

            {/* <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Users />
                </ProtectedRoute>
              }
            /> */}

            <Route
              path="/posts/:userId"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UserPosts />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-post"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <CreatePost />
                </ProtectedRoute>
              }
            />

            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

/**
 /register
/users
/posts/:userId
/create-post
/unauthorized
/login
 */
