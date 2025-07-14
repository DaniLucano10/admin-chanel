import { useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/login",
        { email, password }
      );

      const data = response.data;

      // Guarda token en cookie
      Cookies.set(
        import.meta.env.VITE_US_COOKIE,
        JSON.stringify({ access_token: data.access_token }),
        {
          expires: 1,
          secure: true,
          sameSite: "strict",
        }
      );

      setUser(jwtDecode(data.access_token));
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const getUser = useCallback(() => {
    const userCookie = Cookies.get(import.meta.env.VITE_US_COOKIE);
    if (!userCookie) return null;

    try {
      const { access_token } = JSON.parse(userCookie);
      if (!access_token) return null;
      return jwtDecode(access_token);
    } catch {
      return null;
    }
  }, []);

  const getToken = useCallback(() => {
    const userCookie = Cookies.get(import.meta.env.VITE_US_COOKIE);
    if (!userCookie) return null;

    try {
      const { access_token } = JSON.parse(userCookie);
      return access_token || null;
    } catch {
      return null;
    }
  }, []);

  const logout = async () => {
    const token = getToken();
    const decoded = getUser();

    if (!token || !decoded?.email) {
      setError("No se pudo cerrar sesión correctamente.");
      return;
    }

    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "/auth/logout",
        {
          email: decoded.email,
          access_token: token,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      //  Elimina la cookie
      Cookies.remove(import.meta.env.VITE_US_COOKIE);

      setUser(null);
      navigate("/auth");
    } catch (err) {
      setError(err.response?.data?.message || "Error al cerrar sesión");
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    getUser,
    getToken,
  };
};
