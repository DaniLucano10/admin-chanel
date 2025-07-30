import { useState } from "react";
import { useAuth } from "../useAuth";
import axios from "axios";

export const useCreatePermission = ({ fetch, close }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const { getToken } = useAuth();

    const register = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const token = getToken();
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/permission`,
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
                    : 'A ocurrido un error al registrar el dato.'
            );
        } finally {
            setLoading(false);
        }
    };

    return { register, data, loading, error, setError };
}