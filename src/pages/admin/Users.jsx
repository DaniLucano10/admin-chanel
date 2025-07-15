import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Input, Button, Modal } from "../../components/ui";
import { UserTable } from "../../components/tables/UserTable";
import { useFetchUsers } from "../../hooks";
import { AddUserForm, EditUserForm } from "../../components";

export const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Para saber si estamos editando o creando
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useFetchUsers();

  // Abre el modal para crear un nuevo usuario
  const handleCreate = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  // Abre el modal para editar un usuario existente
  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  // Cierra el modal y resetea el estado
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  return (
    <div className="space-y-4 w-full">
      <h1 className="text-2xl text-black dark:text-white font-bold">
        Lista de Usuarios
      </h1>

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
        <Button variant="primary" onClick={handleCreate}>
          Crear Usuario
        </Button>
      </div>
      <UserTable
        users={data}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onEdit={handleEdit}
      />
      <Modal
        size="2xl"
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={currentUser ? "Editar Usuario" : "Añadir Nuevo Usuario"}
      >
        {currentUser ? (
          <EditUserForm user={currentUser} onFormSubmit={closeModal} />
        ) : (
          <AddUserForm onFormSubmit={closeModal} />
        )}
      </Modal>
    </div>
  );
};
