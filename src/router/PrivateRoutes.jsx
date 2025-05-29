import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";

export const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  return token ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
