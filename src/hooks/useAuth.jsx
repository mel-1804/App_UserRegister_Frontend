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
        throw new Error("Error al crear usuario");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en la creación del usuario:", error);
    }
  };

  return { createUser };
}
