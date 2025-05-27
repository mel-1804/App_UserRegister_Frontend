// import { Navigate, Outlet } from "react-router-dom";

// export const PrivateRoutes = () => {
//   const token = localStorage.getItem("token");
//   return token ? <Outlet /> : <Navigate to="/login" />;
// };

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
