import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Input, Button, Modal, ConfirmDeleteDialog } from "../../components/ui";
import { UserTable } from "../../components/tables/UserTable";
import { useCreateUser, useFetchUsers } from "../../hooks";
import { AddUserForm, EditUserForm } from "../../components";

export const Users = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const handleActionClick = (user, action) => {
    setSelectedItem(user);
    switch (action) {
      case "edit":
        setOpenEditModal(true);
        break;
      case "delete":
        setOpenDeleteModal(true);
        break;
      default:
        break;
    }
  };

  const { data, fetchUsers, loading } = useFetchUsers();

  const {
    register,
    loading: loadingRegister,
    error: errorRegister,
    success: successRegister,
    setError: setErrorRegister,
  } = useCreateUser({
    fetch: fetchUsers,
    close: () => setOpenAddModal(false),
  });

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
        <Button variant="primary" onClick={() => setOpenAddModal(true)}>
          Crear Usuario
        </Button>
      </div>
      <UserTable
        users={data}
        onActionClick={handleActionClick}
        loading={loading}
      />
      //Modales
      <Modal
        size="lg"
        open={openAddModal}
        onOpenChange={() => {
          setOpenAddModal(false);
          setErrorRegister(null);
        }}
        title="Añadir Nuevo Usuario"
      >
        <AddUserForm
          onFormSubmit={(formData) => register(formData)}
          loading={loadingRegister}
          error={errorRegister}
          success={successRegister}
        />
      </Modal>
      <Modal
        size="lg"
        open={openEditModal}
        onOpenChange={setOpenEditModal}
        title="Editar Usuario"
      >
        <EditUserForm user={selectedItem} onFormSubmit={() => {}} />
      </Modal>
      <ConfirmDeleteDialog
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        onConfirm={() => console.log("Eliminando usuario:", selectedItem)}
      />
    </div>
  );
};
