import { useState } from "react"
import { useAuth } from './../useAuth';
import axios from "axios";


export const useCreateUser = ({ fetch, close }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);
  const { getToken } = useAuth();

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = getToken();
        const response = await axios.post(
            import.meta.env.VITE_API_URL  + '/users',
            formData,
            {
                headers: { Authorization: `Bearer ${token}`},
            }
        );
        setData(response.data);
        setSuccess(true);
        fetch();
        close();
    } catch (err) {
        setError(
            err.response && err.response.data
            ? err.response.data.message
            : "Ocurrió un error al registrar los datos."
        );
    } finally {
        setLoading(false);
    }
  };

  return { register, data, loading, error, success, setError, setSuccess };
};
