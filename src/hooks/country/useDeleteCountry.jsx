import { useState } from "react";
import { useAuth } from "../useAuth";
import axios from "axios";
import { useToast } from "../../context/ToastContext";

export const useDeleteCountry = ({ id, fetch, close }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getToken } = useAuth();
    const { showToast } = useToast();

    const remove = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = getToken();
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/country/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            showToast("País eliminado correctamente", "success");
            fetch();
            close();
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Ocurrió un error al eliminar el país.';
            setError({ message: errorMessage });
            showToast(errorMessage, "error");
        } finally {
            setLoading(false);
        }
    };

    return { remove, loading, error };
};
