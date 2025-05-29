import { useState } from "react";
import { LoadingButton } from "../common/LoadingButton";
import { IconEye } from "../common/IconEye.jsx";
import PropTypes from "prop-types";

export function FormEdit({ onClose, onUpdateSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.target;
    const token = localStorage.getItem("token");

    const updatedUser = {
      name: form.name.value,
      lastName: form.lastName.value,
      cellphone: form.cellphone.value,
    };

    if (form.password.value.trim() !== "") {
      updatedUser.password = form.password.value;
    }

    try {
      const response = await fetch(
        `http://localhost:5004/updateUser/${currentUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Updates localStorage using the new data
        const updatedCurrentUser = {
          ...currentUser,
          ...updatedUser,
        };
        localStorage.setItem("user", JSON.stringify(updatedCurrentUser));

        alert("Datos actualizados correctamente");
        onUpdateSuccess(); // Refresh List in Home
        onClose(); // Close the form
      } else {
        setError(data.message || "Error al actualizar usuario");
      }
    } catch (err) {
      setError(err.message || "Ocurrió un error en la solicitud");
    } finally {
      setIsLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    lastName: currentUser?.lastName || "",
    cellphone: currentUser?.cellphone || "",
    password: "",
  });

  return (
    <div className="bg-sky-100 w-full max-w-6xl shadow-lg rounded-2xl mx-auto p-4 font-normal">
      <div className="place-self-center flex justify-center rounded-lg pt-2 mb-2 mt-2">
        <h1 className="text-center font-bold text-sky-800 mt-5">
          Editar datos del usuario
        </h1>
      </div>

      <form className="mx-4 my-5" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-col lg:flex-col px-3 py-2 md:py-1 md:gap-5 lg:gap-8">
          <div className="flex flex-col md:flex-row lg:flex-row md:gap-8 lg:gap-10">
            <div className="flex flex-col md:w-2/5 lg:w-1/2">
              <label
                htmlFor="rut"
                className="block text-xs font-medium leading-6 text-sky-800"
              >
                RUT
              </label>
              <input
                className="text-gray-500 w-full bg-sky-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 focus:outline-none"
                type="text"
                name="rut"
                value={currentUser?.rut}
                readOnly
              />

              <label
                htmlFor="name"
                className="block text-xs font-medium leading-6 text-sky-800"
              >
                Primer Nombre
              </label>
              <input
                className="w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <label
                htmlFor="lastName"
                className="block text-xs font-medium leading-6 text-sky-800"
              >
                Apellido Paterno
              </label>
              <input
                className="w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col md:w-2/5 lg:w-1/2">
              <label
                htmlFor="email"
                className="block text-xs font-medium leading-6 text-sky-800"
              >
                Correo
              </label>
              <input
                className="text-gray-500 w-full bg-sky-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 focus:outline-none"
                type="text"
                name="email"
                value={currentUser?.email}
                readOnly
              />

              <label
                htmlFor="cellphone"
                className="block text-xs font-medium leading-6 text-sky-800"
              >
                Teléfono
              </label>
              <input
                className="w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
                type="text"
                name="cellphone"
                value={formData.cellphone}
                onChange={(e) =>
                  setFormData({ ...formData, cellphone: e.target.value })
                }
              />

              <label
                htmlFor="password"
                className="block text-xs font-medium leading-6 text-sky-800"
              >
                Contraseña
              </label>

              <div className="relative">
                <input
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg shadow-inner shadow-gray-500/50 p-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={
                    passwordTouched
                      ? formData.password
                      : formData.password
                      ? "********"
                      : ""
                  }
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setPasswordTouched(true);
                  }}
                  onFocus={() => {
                    if (!passwordTouched && formData.password === "") {
                      setPasswordTouched(true);
                    }
                  }}
                  placeholder="********"
                />

                <div className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer">
                  <IconEye
                    showPassword={showPassword}
                    togglePasswordVisibility={() =>
                      setShowPassword((prev) => !prev)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <div className="flex flex-col gap-7 my-5">
            <div className="flex justify-center items-center">
              <LoadingButton isLoading={isLoading}>
                Guardar Cambios
              </LoadingButton>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="button"
                className="flex justify-center items-center w-full md:w-1/2 lg:w-1/2 bg-red-600 font-semibold shadow-md hover:brightness-110 ease-in-out duration-200 text-white rounded-md px-1 py-2"
                onClick={onClose}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

FormEdit.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdateSuccess: PropTypes.func.isRequired,
};
