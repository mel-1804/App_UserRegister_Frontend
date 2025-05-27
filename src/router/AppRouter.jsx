import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { Login } from "../views/Login";
import { NewUser } from "../views/NewUser";
import { Home } from "../views/Home";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/newUser" element={<NewUser />} />

        {/* Rutas privadas con Sidebar */}
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};
