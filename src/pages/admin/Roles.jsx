import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Input, Button, Modal, ConfirmDeleteDialog } from "../../components/ui";
import {
  useFetchRoles,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,
} from "../../hooks";
import { AddRoleForm, EditRoleForm, RoleTable } from "../../components";

export const Roles = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPermissionModal, setOpenPermissionModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleActionClick = (user, action) => {
    setSelectedItem(user);
    switch (action) {
      case "edit":
        setOpenEditModal(true);
        break;
      case "permission":
        setOpenPermissionModal(true);
        break;
      case "delete":
        setOpenDeleteModal(true);
        break;
      default:
        break;
    }
  };

  const { data, fetchRoles, loading } = useFetchRoles();

  const {
    register,
    loading: loadingRegister,
    setError: setErrorRegister,
  } = useCreateRole({
    fetch: fetchRoles,
    close: () => setOpenAddModal(false),
  });

  const { update, loading: loadingUpdate } = useUpdateRole({
    id: selectedItem?.id,
    fetch: fetchRoles,
    close: () => setOpenEditModal(false),
  });

  const { remove: deleteRole, loading: loadingDelete } = useDeleteRole({
    id: selectedItem?.id,
    fetch: fetchRoles,
    close: () => setOpenDeleteModal(false),
  });

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteRole();
  };

  const filteredRoles = data?.filter((role) => {
    const term = searchTerm.toLowerCase();
    return role.name?.toLowerCase().includes(term);
  });

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col p-2 md:p-0 md:flex-row md:items-center md:justify-between gap-4 w-full">
        <div className="relative w-full">
          <RiSearchLine className="absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground" />
          <Input
            placeholder="Buscar rol..."
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
            Crear Rol
          </Button>
        </div>
      </div>

      <RoleTable
        data={filteredRoles}
        loading={loading}
        onActionClick={handleActionClick}
      />

      {/* Modales */}
      <Modal
        size="md"
        open={openAddModal}
        onOpenChange={() => {
          setOpenAddModal(false);
          setErrorRegister(null);
        }}
        title="Añadir Nuevo Usuario"
      >
        <AddRoleForm
          onFormSubmit={(formData) => register(formData)}
          loading={loadingRegister}
        />
      </Modal>

      <Modal
        size="md"
        open={openEditModal}
        onOpenChange={setOpenEditModal}
        title="Editar Usuario"
      >
        <EditRoleForm
          data={selectedItem}
          onUpdate={update}
          loading={loadingUpdate}
        />
      </Modal>

      <Modal
        size="lg"
        open={openPermissionModal}
        onOpenChange={setOpenPermissionModal}
        title="Asignar Permisos"
      >
        hola
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
