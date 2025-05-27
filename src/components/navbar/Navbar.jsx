import { useState, useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import iconUser from "../../assets/iconUser.svg";

export const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Close the menu if you clic out of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfile = () => {
    navigate("/profile");
    setMenuOpen(false);
  };

  const handleLogout = () => {
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
          <div className="p-2 lg:px-7 transform transition-transform duration-300 hover:scale-105 cursor-pointer">
            <h1 className="text-white">Logo de la aplicacion</h1>
          </div>
        </NavLink>
        {/* USUARIO------------------------------------------------------------------------------------------------- */}
        <div className="flex flex-row lg:mx-7 gap-4 items-center bg-sky-100 rounded-full px-4 py-3 shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer">
          <div className="hidden md:flex gap-1 items-end text-stone-600">
            <span>Bienvenid@</span>
            <span className="font-semibold whitespace-nowrap ">
              {currentUser?.name} {currentUser?.lastName}{" "}
            </span>
          </div>
          <div
            className="w-16 h-16 rounded-full overflow-hidden border border-sky-700 bg-stone-400 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img className="text-gray-500 w-8 h-8" src={iconUser} alt="user" />
          </div>
          {/* MENU DESPLEGABLE------------------------------------------------------------------------------------------- */}
          {menuOpen && (
            <div className="absolute right-0 top-20 bg-white rounded-md shadow-md mt-2 z-50 w-40">
              <button
                onClick={handleProfile}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
              >
                Perfil
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
