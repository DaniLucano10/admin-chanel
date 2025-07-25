import { useState } from "react";
import axios from "axios";
import { useAuth } from "../useAuth";
import { useToast } from "../../context/ToastContext";

export const useToggleUserStatus = ({ fetchUsers }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();
  const { showToast } = useToast();

  const toggleStatus = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();
      await axios.patch(
        import.meta.env.VITE_API_URL + `/users/toggle-status/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showToast("Estado del usuario actualizado", "success");
      fetchUsers(); 
    } catch (err) {
      const errorMessage = err.response?.data?.message || "No se pudo actualizar el estado";
      setError({ message: errorMessage });
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return { toggleStatus, loading, error };
};
