import { useState } from "react";
import { useAuth } from './../useAuth';
import axios from "axios";
import { useToast } from "../../context/ToastContext";

export const useUpdateUser = ({ fetch, close }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();
  const { showToast } = useToast();

  const update = async (id, formData) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();
      await axios.put(
        `https://backactixweb-dev.itscloud.store/users/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showToast("Usuario actualizado exitosamente.", "success");
      fetch();
      close();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Ocurrió un error al actualizar los datos.";
      setError({ message: errorMessage });
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error, setError };
};
