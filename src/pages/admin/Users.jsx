import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Input, Button } from "../../components/ui";
import { UserTable } from "../../components/tables/UserTable";
import { useFetchUsers } from "../../hooks";

export const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading } = useFetchUsers();

  return (
    <div className="space-y-4 w-full">
      <h1 className="text-2xl text-black dark:text-white font-bold">Lista de Usuarios</h1>

      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="relative w-full max-w-sm">
          <RiSearchLine className="absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground" />
          <Input
            placeholder="Buscar usuario..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="primary">Crear Usuario</Button>
      </div>
        <UserTable
          users={data}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      
    </div>
  );
};
