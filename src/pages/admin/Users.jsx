import { useState, useMemo } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Input, Button } from "../../components/ui";
import { UserTable } from "../../components/tables/UserTable";

// Datos simulados
const usersData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Usuario ${i + 1}`,
  email: `usuario${i + 1}@example.com`,
  role: i % 3 === 0 ? "Admin" : i % 2 === 0 ? "Editor" : "Viewer",
  createdAt: new Date(
    2023,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  ).toLocaleDateString(),
  status: i % 4 === 0 ? "Inactive" : "Active",
}));

export const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = useMemo(() => {
    return usersData.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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
        users={filteredUsers}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
