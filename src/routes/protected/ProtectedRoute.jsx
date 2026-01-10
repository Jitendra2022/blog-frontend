import { Navigate, Outlet } from "react-router-dom";
import useUser from "../../hook/useUser";

const ProtectedRoute = () => {
  const { user } = useUser();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Not admin
  if (user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // Protected allowed
  return <Outlet />;
};

export default ProtectedRoute;
