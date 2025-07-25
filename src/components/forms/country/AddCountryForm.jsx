import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod/v3";
import { Button, Input } from "../../ui";

const schema = z.object({
  name: z.string().min(3, "El nombre es muy corto"),
  code: z.string().min(2, "El código es muy corto"),
  dial_code: z.string().min(1, "El código de marcación es requerido"),
});

export const AddCountryForm = ({ onFormSubmit, loading }) => {
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
        <label className="text-sm font-medium">Nombre del país</label>
        <Input {...register("name")} placeholder="Ej: España" />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Código */}
      <div>
        <label className="text-sm font-medium">Código del país</label>
        <Input {...register("code")} placeholder="Ej: ES" />
        {errors.code && (
          <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
        )}
      </div>

      {/* Código de marcación */}
      <div>
        <label className="text-sm font-medium">Código de marcación</label>
        <Input {...register("dial_code")} placeholder="+34" />
        {errors.dial_code && (
          <p className="text-red-500 text-sm mt-1">
            {errors.dial_code.message}
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
        {loading ? "Registrando..." : "Crear Pais"}
      </Button>
    </form>
  );
};
