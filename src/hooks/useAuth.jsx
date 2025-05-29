export function useAuth() {
  const createUser = async (userData) => {
    try {
      const response = await fetch("http://localhost:5004/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rut: userData.rut,
          name: userData.name,
          lastName: userData.lastName,
          email: userData.email,
          cellphone: userData.cellphone,
          password: userData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData);
        throw new Error("Error al crear usuario");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en la creación del usuario:", error);
      throw error;
    }
  };

  return { createUser };
}
