import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod/v3";
import { Button, Input } from "../../ui";

const schema = z.object({
  name: z.string().min(3, "El nombre es muy corto"),
});

export const EditRoleForm = ({ data, onUpdate, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data?.name,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
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
        <Input {...register("name")} placeholder="Ej: Administrador" />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
