import { useState } from "react";
import { useAuth } from "../useAuth";
import axios from "axios";
import { useToast } from "../../context/ToastContext";

export const useUpdateCountry = ({ id, fetch, close }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getToken } = useAuth();
    const { showToast } = useToast();

    const update = async (payload) => {
        setLoading(true);
        setError(null);

        try {
            const token = getToken();
            await axios.patch(
                `${import.meta.env.VITE_API_URL}/country/${id}`,
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            showToast("País actualizado correctamente", "success");
            fetch();
            close();
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Ocurrió un error al actualizar el país.';
            setError({ message: errorMessage });
            showToast(errorMessage, "error");
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, update };
};
