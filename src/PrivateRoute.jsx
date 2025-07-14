import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const PrivateRoute = ({ children }) => {
  const token = (() => {
    try {
      const cookie = Cookies.get(import.meta.env.VITE_US_COOKIE);
      const parsed = JSON.parse(cookie || "{}");
      return parsed.access_token || null;
    } catch {
      return null;
    }
  })();

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};
