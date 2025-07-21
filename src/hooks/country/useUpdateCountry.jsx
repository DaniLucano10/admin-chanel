import { useState } from "react";
import { useAuth } from "../useAuth";
import axios from "axios";

export const useUpdateCountry = ({ id, fetch, close }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { getToken } = useAuth();

    const update = async (payload) => {
        setLoading(true);
        setError(null);

        try {
            const token = getToken();
            const response = await axios.patch(
                `${import.meta.env.VITE_API_URL}/country/${id}`,
                payload,
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
                    : 'A ocurrido un error al editar el dato.'
            );
        } finally {
            setLoading(false);
        }
    };

    return { loading, data, error, update };
};