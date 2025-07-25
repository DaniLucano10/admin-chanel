import { useState } from "react";
import { useAuth } from "../useAuth";
import axios from "axios";

export const useDeleteCountry = ({ id, fetch, close }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { getToken } = useAuth();

    const remove = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = getToken();
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/country/${id}`,
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
                    ? err.response.data
                    : 'A ocurrido un error al eliminar el dato.'
            );
            close();
        } finally {
            setLoading(false);
        }
    };

    return { remove, loading, error, data, success, setSuccess };
};
