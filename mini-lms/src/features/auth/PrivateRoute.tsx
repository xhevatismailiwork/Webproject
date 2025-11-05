import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isLoggedIn = !!localStorage.getItem("user");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Outlet vendos child routes këtu
  return <Outlet />;
};

export default PrivateRoute;
