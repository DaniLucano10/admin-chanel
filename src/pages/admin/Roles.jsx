import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Input, Button, Modal, ConfirmDeleteDialog } from "../../components/ui";
import {
  useFetchRoles,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,
  useAssignPermissions,
  useUnassignPermissions,
  useFetchPermissions,
} from "../../hooks";
import {
  AddRoleForm,
  AssignPermissionModal,
  EditRoleForm,
  RoleTable,
} from "../../components";

export const Roles = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleActionClick = (user, action) => {
    setSelectedItem(user);
    switch (action) {
      case "edit":
        setOpenEditModal(true);
        break;
      case "permission":
        setOpenAssignModal(true);
        break;
      case "delete":
        setOpenDeleteModal(true);
        break;
      default:
        break;
    }
  };

  const { data, fetchRoles, loading } = useFetchRoles();

  const filteredRoles = data?.filter((role) => {
    const term = searchTerm.toLowerCase();
    return role.name?.toLowerCase().includes(term);
  });

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

  // Asignar permisos
  const { data: permissions } = useFetchPermissions();

  const { assignPermission } = useAssignPermissions({
    fetch: fetchRoles,
    close: () => {},
  });

  const { unassignPermissions } = useUnassignPermissions({
    fetch: fetchRoles,
    close: () => {},
  });

  const handleAssignPermissions = async ({ permissionId, checked }) => {
    if (!selectedItem?.id || !permissionId) {
      return;
    }

    const payload = {
      role_id: selectedItem.id,
      permission_id: permissionId,
    };
    console.log("datos envi", payload);
    try {
      if (checked) {
        await assignPermission(payload);
      } else {
        await unassignPermissions(payload);
      }

      const updatedPermissions = checked
        ? [...(selectedItem.permissions || []), { id: permissionId }]
        : (selectedItem.permissions || []).filter(
            (permission) => permission.id !== permissionId
          );

      setSelectedItem((prev) => ({
        ...prev,
        permissions: updatedPermissions,
      }));
    } catch (error) {
      console.error("Error al cambiar permiso:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteRole();
  };

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

      <AssignPermissionModal
        open={openAssignModal}
        close={() => setOpenAssignModal(false)}
        onAssign={handleAssignPermissions}
        permissions={permissions}
        rolesPermissions={selectedItem?.permissions?.map((r) => r.id) || []}
        roleId={selectedItem?.id}
        selectedItem={selectedItem}
      />

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
