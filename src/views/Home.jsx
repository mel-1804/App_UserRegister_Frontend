import { useEffect, useState } from "react";
import { FormEdit } from "../components/forms/FormEdit";

export const Home = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5004/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.warn("Sesión expirada. Redirigiendo al login...");
        }
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();

      setUsers(data || []);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <main className="flex flex-col justify-center p-20 bg-white rounded-xl font-quicksand">
      <div className="flex flex-col justify-around bg-sky-100 h-full p-8 rounded-3xl gap-8">
        <span className="font-semibold text-stone-600">
          Esta es la lista de usuarios registrados:
        </span>
        <table className="min-w-full text-left text-sm font-normal rounded-lg overflow-hidden">
          <thead className="bg-sky-800 text-white font-semibold">
            <tr>
              <th className="border border-stone-400 px-4 py-2">Nombre</th>
              <th className="border border-stone-400 px-4 py-2">Correo</th>
              <th className="border border-stone-400 px-4 py-2">Teléfono</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {users.map((user) => (
              <tr key={user?.id} className="hover:bg-gray-100">
                <td className="border border-stone-400  px-4 py-2">
                  {user?.name} {user.lastName}
                </td>
                <td className="border border-stone-400 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-stone-400 px-4 py-2">
                  {user.cellphone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col items-start gap-4">
          <button
            onClick={handleToggleForm}
            className="bg-sky-800 w-1/4 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-full shadow-md"
          >
            Editar mis datos
          </button>
          {showForm && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
              <div className="bg-sky-100 rounded-xl shadow-xl p-6 w-1/2 relative">
                <FormEdit onClose={handleClose} onUpdateSuccess={fetchUsers} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
