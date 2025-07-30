import { useState } from "react";
import axios from "axios";
import { useAuth } from "../useAuth";

export const useAssignRole = ({ fetch, close }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const { getToken } = useAuth();

    const assignRole = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const token = getToken();
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/user-has-role`,
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
                    : 'A ocurrido un error al asignar el rol.'
            );
        } finally {
            setLoading(false);
        }
    };

    return { assignRole, loading, error, data };
};