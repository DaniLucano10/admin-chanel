import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "../../ui";
import CountrySelect from "../../ui/select/CountrySelect";
import { useFetchCountry } from "../../../hooks";
import { useEffect } from "react";

const schema = z.object({
  fullname: z.string().min(3, "El nombre es muy corto"),
  email: z.string().email("Correo inválido"),
  country_id: z.number().min(1, "Debes seleccionar un país"),
});

export const EditUserForm = ({ user, onUpdate, loading }) => {
  const { loading: loadingCountry, data: dataCountries } = useFetchCountry();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: user?.fullname,
      email: user?.email,
      country_id: user?.country_id,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fullname: user.fullname,
        email: user.email,
        country_id: user.country_id,
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

      {/* Email y País */}
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
