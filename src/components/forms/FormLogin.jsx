import { useState } from "react";
import { Link } from "react-router-dom";
import { IconEye } from "../../components/common/IconEye";
import { useLogin } from "../../hooks/useLogin";
import { LoadingButton } from "../../components/common/LoadingButton";

export function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useLogin();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-sky-100 w-80 max-h-[90vh] md:w-6/12 lg:min-w-1/4 p-2 lg:p-8 shadow-lg rounded-2xl flex flex-col justify-center text-gray-600">
        <h1 className="text-center font-bold ">Inicio de sesión</h1>

        <form onSubmit={handleLogin} className="mx-4 gap-x-6 gap-y-8">
          <div className="px-3 py-2 md:py-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-800"
            >
              Correo
            </label>
            <input
              className="w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="ejemplo@email.com"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-800 mt-4"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                className="w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
                placeholder="********"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <div className="flex justify-center items-center mt-6">
            <LoadingButton isLoading={isLoading}>Iniciar sesión</LoadingButton>
          </div>
        </form>

        <div className="p-2">
          <p className="mb-4 text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link
              to={"/newUser"}
              className="underline font-semibold hover:brightness-125 cursor-pointer"
            >
              Crea tu cuenta
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
