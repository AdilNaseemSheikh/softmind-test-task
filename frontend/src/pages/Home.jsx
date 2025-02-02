import { useSelector } from "react-redux";
import PostsList from "../components/Posts/PostList";
import UserList from "./Users";
import RegisterForm from "../components/Auth/registerForm";
import Loader from "../components/Global/Loader";

const Home = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <Loader />;

  if (user?.user?.role === "admin") return <UserList />;
  if (user?.user?.role === "super-admin") return <RegisterForm />;

  if (user?.user?.role === "user") return <PostsList />;
};

export default Home;
