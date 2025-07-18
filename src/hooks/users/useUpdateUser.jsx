import { useState } from "react";
import { useAuth } from './../useAuth';
import axios from "axios";

export const useUpdateUser = ({ fetch, close }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [data, setData] = useState(null);
  const { getToken } = useAuth();

  const update = async (id, formData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = getToken();
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data);
      setSuccess("Usuario actualizado exitosamente.");
      fetch();
      setTimeout(() => {
        close();
        setSuccess(null);
      }, 2000);
    } catch (err) {
      setError(
        err.response && err.response.data
          ? err.response.data.message
          : "Ocurrió un error al actualizar los datos."
      );
    } finally {
      setLoading(false);
    }
  };

  return { update, data, loading, error, success, setError };
};
