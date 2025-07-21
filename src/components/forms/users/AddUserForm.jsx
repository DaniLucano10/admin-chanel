import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CountrySelect, Input } from "../../ui";
import { useFetchCountry } from "../../../hooks";

const schema = z.object({
  fullname: z.string().min(3, "El nombre es muy corto"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  country_id: z.number().min(1, "Debes seleccionar un país"),
});

export const AddUserForm = ({ onFormSubmit, loading }) => {

  const { loading: loadingCountry, data: dataCountries } = useFetchCountry();
  console.log("Paises", dataCountries);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    onFormSubmit?.(data);
    reset();
    console.log("datos enviados", data);
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
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="w-full md:w-1/2">
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
        <div className="w-full md:w-1/2">
          <label className="text-sm font-medium">País</label>
          <Controller
            name="country_id"
            control={control}
            render={({ field }) => (
              <CountrySelect
                options={dataCountries}
                value={field.value}
                onChange={(option) => field.onChange(option.id)}
                placeholder={loadingCountry ? "Cargando países..." : "Selecciona un país"}
                disabled={loadingCountry}
              />
            )}
          />
          {errors.country_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country_id.message}
            </p>
          )}
        </div>
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
