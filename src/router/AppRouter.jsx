import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { Login } from "../views/Login";
import { NewUser } from "../views/NewUser";
import { Home } from "../views/Home";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/newUser" element={<NewUser />} />

        {/* Private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>

        {/*Default redirection */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};
