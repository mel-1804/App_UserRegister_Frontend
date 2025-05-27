import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { IconEye } from "../common/IconEye";
import { LoadingButton } from "../common/LoadingButton";

export function FormNewUser() {
  const { createUser } = useAuth();

  const [userData, setUserData] = useState({
    rut: "",
    name: "",
    lastName: "",
    email: "",
    cellphone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);

    try {
      await createUser(userData);
      alert("Usuario registrado con éxito");
      setUserData({
        rut: "",
        name: "",
        lastName: "",
        email: "",
        cellphone: "",
        password: "",
        confirmPassword: "",
      });
      setError("");
    } catch (err) {
      setError(err.message || "Hubo un error al registrar el usuario.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-sky-100 w-80 md:w-6/12 lg:min-w-1/4 shadow-lg rounded-2xl flex flex-col justify-center p-2 lg:p-24">
      <h1 className="text-center font-bold text-deep-emerald mt-5">
        Crear nueva cuenta
      </h1>

      <form onSubmit={handleSubmit} className="mx-4 gap-x-6 gap-y-8">
        <div className="px-3 py-2 md:py-1">
          <label
            htmlFor="rut"
            className="block text-xs font-medium leading-6 text-deep-emerald"
          >
            RUT
          </label>
          <input
            className="input-field w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
            type="text"
            name="rut"
            value={userData.rut}
            onChange={handleChange}
            placeholder="11.111.111-1"
          />

          <label
            htmlFor="name"
            className="block text-xs font-medium leading-6 text-deep-emerald"
          >
            Nombre
          </label>
          <input
            className="input-field w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Nombre"
          />

          <label
            htmlFor="lastName"
            className="block text-xs font-medium leading-6 text-deep-emerald"
          >
            Apellido
          </label>
          <input
            className="input-field w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            placeholder="Apellido"
          />

          <label
            htmlFor="email"
            className="block text-xs font-medium leading-6 text-deep-emerald"
          >
            Correo
          </label>
          <input
            className="input-field w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="ejemplo@email.com"
          />

          <label
            htmlFor="cellphone"
            className="block text-xs font-medium leading-6 text-deep-emerald"
          >
            Teléfono
          </label>
          <input
            className="input-field w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
            type="text"
            name="cellphone"
            value={userData.cellphone}
            onChange={handleChange}
            placeholder="+56 9 111 22 333"
          />

          <label
            htmlFor="password"
            className="block text-xs font-medium leading-6 text-deep-emerald"
          >
            Contraseña
          </label>
          <div className="relative">
            <input
              className="input-field w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
              type={showPassword ? "text" : "password"}
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="********"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            >
              <IconEye
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            </span>
          </div>

          <label
            htmlFor="confirmPassword"
            className="block text-xs font-medium leading-6 text-deep-emerald"
          >
            Repetir Contraseña
          </label>
          <div className="relative">
            <input
              className="input-field w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            >
              <IconEye
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            </span>
          </div>
        </div>

        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

        <div className="flex justify-center items-center">
          <LoadingButton isLoading={isLoading}>Registrar Usuario</LoadingButton>
        </div>
      </form>

      <div>
        <p className="mt-1 mb-5 font-extralight text-center mr-2 xs:text-sm sm:text-base">
          <Link
            to={"/login"}
            className="underline font-semibold text-green text-sm hover:brightness-125 cursor-pointer"
          >
            Ir al Login
          </Link>
        </p>
      </div>
    </div>
  );
}
