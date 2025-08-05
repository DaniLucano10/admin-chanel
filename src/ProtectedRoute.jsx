import PropTypes from 'prop-types';
import { Navigate, /*useLocation,*/ Outlet } from "react-router-dom";
import Cookies from "js-cookie";
// import { usePermissions } from "./context/PermissionContext";

export const PrivateRoute = () => {
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
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};


export const ProtectedRoute = (/*{ requiredPermission }*/) => {
  // const { permissions, loading } = usePermissions();
  // const location = useLocation();

  // if (loading) {
  //   return <div>Loading...</div>; // O un componente de esqueleto/spinner
  // }

  // if (!permissions || permissions.length === 0) {
  //   return <Navigate to="/unauthorized" replace state={{ from: location }} />;
  // }

  // const hasPermission = Array.isArray(requiredPermission)
  //   ? requiredPermission.some((perm) => permissions.includes(perm.trim()))
  //   : permissions.includes(requiredPermission.trim());

  // if (!hasPermission) {
  //   return <Navigate to="/unauthorized" replace state={{ from: location }} />;
  // }

  return <Outlet />;
};

// ProtectedRoute.propTypes = {
//   requiredPermission: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.arrayOf(PropTypes.string),
//   ]),
// };
