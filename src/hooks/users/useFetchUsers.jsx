import { useCallback, useEffect, useMemo, useState } from "react"
import { useAuth } from "../useAuth";
import axios from "axios";


export const useFetchUsers = (params) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const { getToken } = useAuth();

    const memoizedParams = useMemo(() => params, [params]);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const token = getToken();
            const response = await axios.get('https://backactixweb-dev.itscloud.store/users', {
                headers: { Authorization: `Bearer ${token}`},
                params: memoizedParams,
            });
            setData(response.data);
        } catch (err) {
            setData([]);
            setError(
                err.response
                ? err.response.data
                : 'Ha ocurrido un error al obtener los datos'
            );
        } finally {
            setLoading(false);
        }
    }, [memoizedParams, getToken]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return { loading, data, error, fetchUsers}
}
