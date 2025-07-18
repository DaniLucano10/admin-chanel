import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Alert } from "../../ui";
import { useEffect } from "react";

const schema = z.object({
  fullname: z.string().min(3, "El nombre es muy corto"),
  email: z.string().email("Correo inválido"),
});

export const EditUserForm = ({ user, onUpdate, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: user?.fullname,
      email: user?.email,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fullname: user.fullname,
        email: user.email,
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    onUpdate(user.id, data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Guardando..." : "Guardar Cambios"}
      </Button>
    </form>
  );
};
