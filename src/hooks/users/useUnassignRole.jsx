import { useState } from "react";
import { useAuth } from "../useAuth";
import axios from "axios";

export const useUnassignRole = ({ fetch, close }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const { getToken } = useAuth();

  const unassignRole = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user-has-role/unassign-user-role`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data);
      fetch();
      close();
    } catch (err) {
      setError(
        err.response
          ? err.response.data
          : "Ha ocurrido un error al desasignar el rol."
      );
    } finally {
      setLoading(false);
    }
  };

  return { unassignRole, loading, error, data };
};
