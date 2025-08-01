import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '../../ui'
import { useFetchCountry, useFetchRoles } from '../../../hooks'
import { CustomSelect, CountrySelect } from '../../ui/select'

const schema = z.object({
  fullname: z.string().min(3, 'El nombre es muy corto'),
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  country_id: z.number().min(1, 'Debes seleccionar un país'),
  role_id: z.string().min(1, 'Debes seleccionar un rol').transform(val => parseInt(val, 10))
})

export const AddUserForm = ({ onFormSubmit, loading }) => {
  const { loading: loadingCountry, data: dataCountries } = useFetchCountry()
  const { data: dataRoles, loading: loadingRoles } = useFetchRoles()
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
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="w-full md:w-1/2">
          <label className="text-sm font-medium">Nombre completo</label>
          <Input {...register("fullname")} placeholder="Juan Pérez" />
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullname.message}
            </p>
          )}
        </div>
        <div className="w-full md:w-1/2">
          <label className="text-sm font-medium">Correo electrónico</label>
          <Input
            {...register("email")}
            type="email"
            placeholder="correo@ejemplo.com"
          />
          {errors.role_id && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="w-full md:w-1/2">
          <label className="text-sm font-medium">Seleciona rol</label>
          <Controller
            name="role_id"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                options={dataRoles?.map(role => ({ value: role.id, label: role.name }))}
                loading={loadingRoles}
                placeholder="Selecciona un rol"
              />
            )}
          />
          {errors.role_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.role_id.message}
            </p>
          )}
        </div>
        <div className="w-full md:w-1/2">
          <label className="text-sm font-medium">Selecciona País</label>
          <Controller
            name="country_id"
            control={control}
            render={({ field }) => (
              <CountrySelect
                options={dataCountries}
                value={field.value}
                onChange={(option) => field.onChange(option.id)}
                placeholder={
                  loadingCountry ? "Cargando países..." : "Selecciona un país"
                }
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
