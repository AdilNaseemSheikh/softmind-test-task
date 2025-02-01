import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
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
          <Route path="/unauthorized" element={<h1>Access Denied</h1>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
