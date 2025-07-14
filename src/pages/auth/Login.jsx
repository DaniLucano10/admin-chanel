import { useState } from "react";
import { RiLockLine, RiUserLine } from "react-icons/ri";
import { Alert, Button, Input } from "../../components/ui";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await login(email, password);

  if (result?.access_token) {
    navigate("/admin");
  } else {
    console.log("🚫 Error de login");
  }
};

  return (
    <main className="h-screen w-full flex items-center justify-center bg-background text-foreground overflow-hidden">
      <div className="w-full max-w-md bg-card text-card-foreground p-8 rounded-xl shadow-md border border-border">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Correo electrónico
            </label>
            <div className="relative">
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@correo.com"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Contraseña</label>
            <div className="relative">
              <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="pl-10"
              />
            </div>
          </div>

          <Button className="w-full" variant="primary" type="submit">
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </Button>

          {error && <Alert type="error" message={error} />}
        </form>
      </div>
    </main>
  );
};
