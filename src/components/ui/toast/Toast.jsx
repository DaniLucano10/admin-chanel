import { useEffect } from "react";
import { Alert } from "../alert";

export const Toast = ({ type = "success", message, duration = 2000, onClose }) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-[50px] left-1/2 transform -translate-x-1/2 w-[300px] z-[9999]">
      <Alert
        type={type}
        message={message}
        className="shadow-lg border border-black/10 dark:border-white/10"
      />
    </div>
  );
};