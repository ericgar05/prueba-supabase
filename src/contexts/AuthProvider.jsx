import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useState } from "react";
import supabase from "../api/supaBase";
import bcrypt from "bcryptjs";

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("userSession");
    return saved ? JSON.parse(saved) : {};
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    console.log("Datos de login:", formData);
    // Aquí iría la lógica para enviar los datos al servidor
    // TODO: Devuelve un objeto con una propiedad (En este caso porque solo se selecciona password_hash)

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", formData.email)
      .single();

    // TODO: Si no pones .single te devuelve un array

    if (error || !data) {
      throw new Error("Usuario no encontrado");
    }

    const isMatch = await bcrypt.compare(formData.password, data.password_hash);
    if (!isMatch) {
      throw new Error("Contraseña incorrecta");
    }

    setUserData(data);
    setIsAuthenticated(true);
    localStorage.setItem("userSession", JSON.stringify(data));
    localStorage.setItem("isAuthenticated", "true");

    const lastPath = localStorage.getItem("lastPath") || "/";
    navigate(lastPath);
  };

  const handleLogout = () => {
    setUserData({});
    setIsAuthenticated(false);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
