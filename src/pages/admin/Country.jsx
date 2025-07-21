import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Input, Button } from "../../components/ui";

import { CountryTable } from "../../components";
import { useFetchCountry } from "../../hooks";

export const Country = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, fetchCountries, loading } = useFetchCountry();

  const filteredCountries = data?.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(term) ||
      user.dial_code?.toLowerCase().includes(term)
    );
  });
  console.log(filteredCountries);
  return (
    <div className="space-y-4 w-full">
      {/* <h1 className="text-2xl text-black dark:text-white font-bold">
        Lista de Usuarios
      </h1> */}
      <div className="flex flex-col p-2 md:p-0 md:flex-row md:items-center md:justify-between gap-4 w-full">
        <div className="relative w-full">
          <RiSearchLine className="absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground" />
          <Input
            placeholder="Buscar usuario..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-auto">
          <Button className="w-full md:w-64" variant="primary" onClick={false}>
            Crear Usuario
          </Button>
        </div>
      </div>

      <CountryTable data={filteredCountries} loading={loading} />
    </div>
  );
};
