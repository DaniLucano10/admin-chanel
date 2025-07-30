import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ForgetPassword, Login } from "./pages/auth";
import { AuthLayout } from "./layouts/AuthLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { Error404 } from "./pages/Error404";
import { Unauthorized } from "./pages/Unauthorized";
import { Country, Dashboard, Home, Users } from "./pages/admin";
import { PrivateRoute, ProtectedRoute } from "./ProtectedRoute";
import { PermissionProvider } from "./context/PermissionContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de autenticación */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="olvide-password" element={<ForgetPassword />} />
        </Route>

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/admin"
            element={
              <PermissionProvider>
                <AdminLayout />
              </PermissionProvider>
            }
          >
            <Route index element={<Home />} />
            <Route
              element={<ProtectedRoute requiredPermission="dashboard.view" />}
            >
              <Route path="/admin/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<ProtectedRoute requiredPermission="users.view" />}>
              <Route path="/admin/users" element={<Users />} />
            </Route>
            <Route
              element={<ProtectedRoute requiredPermission="settings.view" />}
            >
              <Route path="/admin/settings/country" element={<Country />} />
            </Route>
          </Route>
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
