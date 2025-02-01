import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome, {user ? user.name : "Guest"}
      </h1>
      {user ? (
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2"
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
        >
          Logout
        </button>
      ) : (
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 bg-red"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Home;
