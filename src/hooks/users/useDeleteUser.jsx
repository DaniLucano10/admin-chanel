import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../useAuth';
import { useToast } from '../../context/ToastContext';

export const useDeleteUser = ({ id, close, fetch }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();
  const { showToast } = useToast();

  const remove = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();
      await axios.delete(
        import.meta.env.VITE_API_URL + `/users/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showToast("Usuario eliminado exitosamente.", "success");
      fetch();
      close();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Ha ocurrido un error al eliminar los datos.';
      setError({ message: errorMessage });
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
};
