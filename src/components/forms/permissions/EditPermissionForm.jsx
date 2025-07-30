import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod/v3";
import { Button, Input } from "../../ui";

const schema = z.object({
  name: z.string().min(3, "El nombre es muy corto"),
  guard_name: z.string().min(2, "El nombre del permiso es muy corto"),
});

export const EditPermissionForm = ({ data, onUpdate, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data?.name,
      guard_name: data?.guard_name,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        guard_name: data.guard_name,
      });
    }
  }, [data, reset]);

  const onSubmit = (data) => {
    onUpdate(data);
    console.log("datos enviados", data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Nombre */}
      <div>
        <label className="text-sm font-medium">Nombre </label>
        <Input {...register("name")} placeholder="Ej: Ver Usuarios" />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Código */}
      <div>
        <label className="text-sm font-medium">Nombre del permiso</label>
        <Input {...register("guard_name")} placeholder="Ej: user.view" />
        {errors.guard_name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.guard_name.message}
          </p>
        )}
      </div>

      {/* Botón de enviar */}
      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Actualizando..." : "Actualizar Permiso"}
      </Button>
    </form>
  );
};
