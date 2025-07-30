import { useState } from "react";
import axios from "axios";
import { useAuth } from "../useAuth";

export const useUnassignPermissions = ({ fetch, close }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const { getToken } = useAuth();

  const unassignPermissions = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/role-has-permission/unassign-role-permission`,
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

  return { unassignPermissions, loading, error, data };
};
