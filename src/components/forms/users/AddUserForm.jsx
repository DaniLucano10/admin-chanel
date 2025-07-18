import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Alert } from "../../ui";

const schema = z.object({
  fullname: z.string().min(3, "El nombre es muy corto"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const AddUserForm = ({ onFormSubmit, loading, error, success }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    onFormSubmit?.(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}
      {/* Nombre */}
      <div>
        <label className="text-sm font-medium">Nombre completo</label>
        <Input {...register("fullname")} placeholder="Juan Pérez" />
        {errors.fullname && (
          <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="text-sm font-medium">Correo electrónico</label>
        <Input
          {...register("email")}
          type="email"
          placeholder="correo@ejemplo.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Contraseña */}
      <div>
        <label className="text-sm font-medium">Contraseña</label>
        <Input {...register("password")} type="password" placeholder="••••••" />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Registrando..." : "Crear Usuario"}
      </Button>
    </form>
  );
};
