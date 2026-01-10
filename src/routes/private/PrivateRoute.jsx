import { Navigate, Outlet } from "react-router-dom";
import useUser from "../../hook/useUser";

const PrivateRoute = () => {
  const { user } = useUser();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Private allowed
  return <Outlet />;
};

export default PrivateRoute;
