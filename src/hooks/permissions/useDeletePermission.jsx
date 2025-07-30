import { useState } from "react";
import { useAuth } from "../useAuth";
import axios from "axios";

export const useDeletePermission = ({ id, fetch, close }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { getToken } = useAuth();

    const remove = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = getToken();
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/permission/${id}`,
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
                    : 'A ocurrido un error al eliminar el dato.'
            );
            close();
        } finally {
            setLoading(false);
        }
    };

    return { remove, loading, error, data };
};