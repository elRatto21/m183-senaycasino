import { Navigate, Outlet } from "react-router-dom";
import Nav from "../navbar/Nav";

const ProtectedRoute = () => {
  return localStorage.getItem("username") ? (
    <>
      <Nav />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
