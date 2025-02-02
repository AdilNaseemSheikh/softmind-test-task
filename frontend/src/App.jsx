import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./components/Auth/registerForm";
import ProtectedRoute from "./components/Global/ProtectedRoutes";
import CreatePost from "./components/Posts/createPostForm";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import UserPosts from "./pages/UserPosts";
import Users from "./pages/Users";
import Loader from "./components/Global/Loader";
import Layout from "./Layout";

function App() {
  const { getUser } = useAuth();
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />

            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts/:userId" element={<UserPosts />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                  <h1>Admin Page</h1>
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <h1>Super Admin Page</h1>
                </ProtectedRoute>
              }
            />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
