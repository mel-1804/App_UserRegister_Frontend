import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5004/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Respuesta del backend:", data);
      if (data.access_token && data.user) {
        console.log("Usuario autenticado:", data.user);
        // Saving user data in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/home");
        return { success: true };
      } else {
        alert("Correo o contraseña incorrectos");
        return { success: false };
      }
    } catch (error) {
      console.error("Error durante el login:", error.message);
      alert("Ocurrió un error al iniciar sesión");
      return { success: false };
    }
  };

  return { login };
}
