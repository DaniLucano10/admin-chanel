// src/hooks/useShowToast.js
import { useEffect } from "react";

/**
 * Hook personalizado para mostrar toasts de éxito o error
 * @param {boolean} success - Indica si la operación fue exitosa
 * @param {boolean} error - Indica si hubo un error
 * @param {string} successMessage - Mensaje de éxito
 * @param {string|object} errorMessage - Mensaje de error (puede ser string u objeto)
 * @param {Function} setShowToast - setState de showToast
 * @param {Function} setToastMessage - setState de toastMessage
 * @param {Function} setToastType - setState de toastType
 * @param {Array} deps - dependencias adicionales para useEffect
 */
export const useShowToast = (
  success,
  error,
  successMessage,
  errorMessage,
  setShowToast,
  setToastMessage,
  setToastType,
  deps = []
) => {
  useEffect(() => {
    if (success) {
      setShowToast(true);
      setToastMessage(successMessage);
      setToastType("success");
    } else if (error) {
      setShowToast(true);
      setToastMessage(
        typeof errorMessage === "string"
          ? errorMessage
          : errorMessage?.message || "Ocurrió un error"
      );
      setToastType("error");
    }
  }, [success, error, ...deps]);
};