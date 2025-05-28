import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import iconUser from "../../assets/iconUser.svg";
import logo from "../../assets/logo.svg";

export const Navbar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  return (
    <>
      <main className="flex flex-row items-center md:justify-between lg:justify-between bg-sky-800 rounded-b-3xl  p-6 gap-5 font-quicksand">
        {/* LOGO---------------------------------------------------------------------------------------------------- */}
        <NavLink to="/home">
          {" "}
          <div className="p-4 lg:px-7 transform transition-transform duration-300 hover:scale-105 cursor-pointer bg-stone-700 rounded-full w-1/3 border border-stone-300">
            <img className="" src={logo} alt="Logo" />
          </div>
        </NavLink>
        {/* USER------------------------------------------------------------------------------------------------- */}
        <div className="flex flex-row lg:mx-7 gap-4 items-center bg-sky-100 rounded-full px-4 py-3 shadow-lg">
          <div className="md:flex gap-1 items-end text-stone-600">
            <span>Bienvenid@</span>
            <span className="font-semibold whitespace-nowrap ">
              {currentUser?.name} {currentUser?.lastName}{" "}
            </span>
          </div>
          <div className="w-22 h-18 rounded-full border border-sky-700 bg-stone-400 flex items-center justify-center">
            <img className="text-gray-500" src={iconUser} alt="user" />
          </div>
          {/* LOGOUT------------------------------------------------------------------------------------------- */}

          <div className="bg-stone-400 rounded-full text-xs text-stone-700">
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-stone-300 rounded-full border border-sky-700 transition-colors duration-200 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </main>
    </>
  );
};
