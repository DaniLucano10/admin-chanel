import { useState } from "react";
import { useAuth } from "../useAuth";
import axios from "axios";

export const useCreateCountry = ({ fetch, close }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState(null);
    const { getToken } = useAuth();

    const register = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const token = getToken();
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/country`,
                formData,
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
                    : 'A ocurrido un error al registrar el dato.'
            );
        } finally {
            setLoading(false);
        }
    };

    return { register, data, loading, error, success, setError, setSuccess };
};
