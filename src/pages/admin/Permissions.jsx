import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Input, Button, Modal, ConfirmDeleteDialog } from "../../components/ui";

import {
  AddPermissionForm,
  EditPermissionForm,
  PermissionsTable,
} from "../../components";
import {
  useCreatePermission,
  useDeletePermission,
  useFetchPermissions,
  useUpdatePermission,
} from "../../hooks";

export const Permissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleActionClick = (role, action) => {
    setSelectedItem(role);
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

  const { data, fetchPermissions, loading } = useFetchPermissions();

  const filteredRoles = data?.filter((country) => {
    const term = searchTerm.toLowerCase();
    return (
      country.name?.toLowerCase().includes(term) ||
      country.dial_code?.toLowerCase().includes(term)
    );
  });

  const {
    register,
    loading: loadingRegister,
    setError: setErrorRegister,
  } = useCreatePermission({
    fetch: fetchPermissions,
    close: () => setOpenAddModal(false),
  });

  const { update, loading: loadingUpdate } = useUpdatePermission({
    id: selectedItem?.id,
    fetch: fetchPermissions,
    close: () => setOpenEditModal(false),
  });

  const { remove: deletePermission, loading: loadingDelete } = useDeletePermission({
    id: selectedItem?.id,
    fetch: fetchPermissions,
    close: () => setOpenDeleteModal(false),
  });

  const handleDelete = async (e) => {
    e.preventDefault();
    await deletePermission();
  };

  return (
    <div className="space-y-4 w-full">
      {/* <h1 className="text-2xl text-black dark:text-white font-bold">
        Lista de Usuarios
      </h1> */}
      <div className="flex flex-col p-2 md:p-0 md:flex-row md:items-center md:justify-between gap-4 w-full">
        <div className="relative w-full">
          <RiSearchLine className="absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground" />
          <Input
            placeholder="Buscar permiso..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-auto">
          <Button
            className="w-full md:w-64"
            variant="primary"
            onClick={() => setOpenAddModal(true)}
          >
            Crear Permiso
          </Button>
        </div>
      </div>

      <PermissionsTable
        data={filteredRoles}
        loading={loading}
        onActionClick={handleActionClick}
      />

      {/* Modales */}
      <Modal
        size="sm"
        open={openAddModal}
        onOpenChange={() => {
          setOpenAddModal(false);
          setErrorRegister(null);
        }}
        title="Crear nuevo permiso"
      >
        <AddPermissionForm
          onFormSubmit={(formData) => register(formData)}
          loading={loadingRegister}
        />
      </Modal>

      <Modal
        size="sm"
        open={openEditModal}
        onOpenChange={() => setOpenEditModal(false)}
        title="Editar permiso"
      >
        <EditPermissionForm
          data={selectedItem}
          onUpdate={update}
          loading={loadingUpdate}
        />
      </Modal>

      <ConfirmDeleteDialog
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        onConfirm={handleDelete}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar a ${selectedItem?.name}?`}
        loading={loadingDelete}
      />
    </div>
  );
};
