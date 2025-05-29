import { useState } from "react";
import PropTypes from "prop-types";
import { LoadingButton } from "../common/LoadingButton";

export const FormDeactivate = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5004/user/${userId}/deactivate`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al desactivar usuario");
      }

      const data = await response.json();
      console.log(data.msg);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    } catch (error) {
      setError(error.message || "No se pudo desactivar el usuario.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5004/deleteUser/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar usuario");
      }

      const data = await response.json();
      console.log(data.msg);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    } catch (error) {
      setError(error.message || "No se pudo eliminar el usuario.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mx-4 my-5" onSubmit={handleSubmit}>
      <div className="bg-sky-100 w-full max-w-6xl rounded-2xl mx-auto p-4 font-normal flex flex-col">
        <span className="flex justify-center">
          A través de esta opción eliminarás a tu usuario de la aplicación.
        </span>
        {error && <p className="text-red-500 text-xs text-center">{error}</p>}
        <div className="flex flex-col gap-7 my-5">
          <div className="flex justify-center items-center">
            <LoadingButton isLoading={isLoading}>
              QUIERO DAR DE BAJA MI USUARIO
            </LoadingButton>
          </div>
          <div className="flex justify-center items-center mb-5">
            <button
              type="button"
              className="flex justify-center items-center w-full md:w-1/2 lg:w-1/2 bg-red-600 font-semibold shadow-md hover:brightness-110 ease-in-out duration-200 text-white rounded-md px-1 py-2"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
        <hr className="border-t-2 border-gray-400 my-4" />
        <div className="text-sm bg-red-300 rounded-2xl p-3 mt-5 flex flex-col items-center gap-3">
          <span className="font-semibold text-lg justify-center">
            Zona de peligro:
          </span>
          <span>
            Con este botón eliminarás tu usuario de la base de datos, pero tu yo
            yo sabemos que por buenas prácticas eso no debería suceder. Lo
            correcto es Desactivar al Usuario, pero no borrar su información.
          </span>
          <span className="italic">
            (Este botón existe sólo para probar una solicitud de tipo DELETE y
            completar el CRUD pedido para esta tarea)
          </span>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <div className="flex flex-col gap-7 my-5">
            <div className="flex justify-center items-center text-xs">
              <LoadingButton isLoading={isLoading} onClick={handleDelete}>
                QUIERO ELIMINAR LA INFORMACIÓN DE MI USUARIO ANYWAY!
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

FormDeactivate.propTypes = {
  onClose: PropTypes.func.isRequired,
};
