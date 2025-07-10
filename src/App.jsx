

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./layouts/AdminLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { Home } from "./pages/admin/Home";
import { Chat } from "./pages/admin/Chat";
import { Users } from "./pages/admin/Users";
import { Error404 } from "./pages/Error404";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { ForgetPassword } from "./pages/auth/ForgetPassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Home />} />
            <Route path="chat" element={<Chat />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registro" element={<Register />} />
            <Route path="olvide-password" element={<ForgetPassword />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
