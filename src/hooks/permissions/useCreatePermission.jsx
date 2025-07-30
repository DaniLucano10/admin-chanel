import { useState } from "react";
import { useAuth } from "../useAuth";
import axios from "axios";
import { useToast } from "../../context/ToastContext";

export const useCreatePermission = ({ fetch, close }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getToken } = useAuth();
    const { showToast } = useToast();

    const register = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const token = getToken();
            await axios.post(
                `${import.meta.env.VITE_API_URL}/permission`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            showToast("Permiso creado correctamente", "success");
            fetch();
            close();
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Ocurrió un error al registrar el permiso.';
            setError({ message: errorMessage });
            showToast(errorMessage, "error");
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error, setError };
}