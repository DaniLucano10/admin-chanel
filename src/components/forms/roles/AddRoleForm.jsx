import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod/v3";
import { Button, Input } from "../../ui";

const schema = z.object({
  name: z.string().min(3, "El nombre es muy corto"),
});

export const AddRoleForm = ({ onFormSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data) => {
    onFormSubmit?.(data);
    console.log("datos enviados", data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Nombre */}
      <div>
        <label className="text-sm font-medium">Nombre del rol</label>
        <Input {...register("name")} placeholder="Ej: Ver usuarios" />
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
        {loading ? "Registrando..." : "Crear Permiso"}
      </Button>
    </form>
  );
};
