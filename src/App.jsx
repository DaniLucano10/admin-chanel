import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ForgetPassword, Login, Register } from "./pages/auth";
import { AuthLayout } from "./layouts/AuthLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { Error404 } from "./pages/Error404";
import { Chat, Country, Home, Users } from "./pages/admin";
import { PrivateRoute } from "./PrivateRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de autenticación */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Register />} />
          <Route path="olvide-password" element={<ForgetPassword />} />
        </Route>

        {/* Rutas protegidas */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="chat" element={<Chat />} />
          <Route path="users" element={<Users />} />
          <Route path="settings/country" element={<Country />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
