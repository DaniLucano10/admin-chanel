import { useState } from "react";
import { useAuth } from "../useAuth";
import axios from "axios";

export const useAssignPermissions = ({ fetch, close }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const { getToken } = useAuth();

  const assignPermission = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/role-has-permission`,
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
          : "A ocurrido un error al asignar el rol."
      );
    } finally {
      setLoading(false);
    }
  };

  return { assignPermission, loading, error, data };
};
