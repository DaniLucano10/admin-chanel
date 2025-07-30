import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../useAuth";
import axios from "axios";

export const useFetchPermissions = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const { getToken } = useAuth();

    const fetchPermissions = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const token = getToken();
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/permission`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setData(response.data || []);
        } catch (err) {
            setData([]);
            setError(
                err.response
                    ? err.response.data
                    : 'A ocurrido un error al obtener los datos.'
            );
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    useEffect(() => {
        fetchPermissions();
    }, [fetchPermissions]);

    return { loading, data, error, fetchPermissions };
}