import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../useAuth';

export const useDeleteUser = ({ id, close, fetch }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); 
  const [data, setData] = useState(null);
  const { getToken } = useAuth();

  const remove = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false); 

    try {
      const token = getToken();
      const response = await axios.delete(
        import.meta.env.VITE_API_URL + `/users/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data);
      setSuccess(true); 
      fetch();
      close();
    } catch (err) {
      setError(
        err.response
          ? err.response.data.message || err.response.data
          : 'Ha ocurrido un error al eliminar los datos.'
      );
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { remove, data, loading, error, success, setSuccess };
};
