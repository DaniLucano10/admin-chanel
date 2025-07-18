import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import {
  Input,
  Button,
  Modal,
  ConfirmDeleteDialog,
  Toast,
} from "../../components/ui";
import { UserTable } from "../../components/tables/UserTable";
import {
  useCreateUser,
  useFetchUsers,
  useUpdateUser,
  useDeleteUser,
  useShowToast,
  useToggleUserStatus,
} from "../../hooks";
import { AddUserForm, EditUserForm } from "../../components";

export const Users = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

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

  const {
    update,
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useUpdateUser({
    id: selectedItem?.id,
    fetch: fetchUsers,
    close: () => setOpenEditModal(false),
  });

  const {
    remove: deleteUser,
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useDeleteUser({
    id: selectedItem?.id,
    fetch: fetchUsers,
    close: () => setOpenDeleteModal(false),
  });

  const {
    toggleStatus,
    error: errorToggle,
    success: successToggle,
  } = useToggleUserStatus({
    fetchUsers,
  });
  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteUser();
  };

  // Para crear usuario
  useShowToast(
    successRegister,
    errorRegister,
    "Usuario creado correctamente",
    errorRegister,
    setShowToast,
    setToastMessage,
    setToastType,
    [successRegister, errorRegister]
  );

  // Para editar usuario
  useShowToast(
    successUpdate,
    errorUpdate,
    "Usuario actualizado correctamente",
    errorUpdate,
    setShowToast,
    setToastMessage,
    setToastType,
    [successUpdate, errorUpdate]
  );

  // Para eliminar usuario
  useShowToast(
    successDelete,
    errorDelete,
    "Usuario eliminado correctamente",
    errorDelete,
    setShowToast,
    setToastMessage,
    setToastType,
    [successDelete, errorDelete]
  );

  // Para cambiar estado
  useShowToast(
    successToggle,
    errorToggle,
    "Estado del usuario actualizado",
    errorToggle,
    setShowToast,
    setToastMessage,
    setToastType,
    [successToggle, errorToggle]
  );

  const handleCloseToast = () => {
    setShowToast(false);
    setTimeout(() => {
      setToastMessage("");
      setToastType("success");
    }, 300);
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
        <Button variant="primary" onClick={() => setOpenAddModal(true)}>
          Crear Usuario
        </Button>
      </div>
      <UserTable
        users={data}
        loading={loading}
        onActionClick={handleActionClick}
        onToggleStatus={(user) => {
          setSelectedItem(user);
          toggleStatus(user.id);
        }}
      />

      {/* Modales */}
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
        />
      </Modal>

      <Modal
        size="lg"
        open={openEditModal}
        onOpenChange={setOpenEditModal}
        title="Editar Usuario"
      >
        <EditUserForm
          user={selectedItem}
          onUpdate={update}
          loading={loadingUpdate}
        />
      </Modal>

      <ConfirmDeleteDialog
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        onConfirm={handleDelete}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar a ${selectedItem?.fullname}?`}
        loading={loadingDelete}
      />
      {showToast && (
        <Toast
          type={toastType}
          message={toastMessage}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};
