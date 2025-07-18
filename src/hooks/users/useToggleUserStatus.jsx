import { useState } from "react";
import axios from "axios";
import { useAuth } from "../useAuth";

export const useToggleUserStatus = ({ fetchUsers }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { getToken } = useAuth();

  const toggleStatus = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

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
      setSuccess(true);
      fetchUsers(); 
    } catch (err) {
      setError(
        err.response?.data?.message || "No se pudo actualizar el estado"
      );
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { toggleStatus, loading, error, success };
};