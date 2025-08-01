import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Input, Button, Modal, ConfirmDeleteDialog } from "../../components/ui";
import { UserTable } from "../../components/tables/UserTable";
import {
  useCreateUser,
  useFetchUsers,
  useUpdateUser,
  useDeleteUser,
  useToggleUserStatus,
  useAssignRole,
  useUnassignRole,
  useFetchRoles,
} from "../../hooks";
import { AddUserForm, AssignRolesModal, EditUserForm } from "../../components";

export const Users = () => {
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
      case "role":
        setOpenAssignModal(true);
        break;
      case "delete":
        setOpenDeleteModal(true);
        break;
      default:
        break;
    }
  };

  const { data, fetchUsers, loading } = useFetchUsers();

  const filteredUsers = data?.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.fullname?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term)
    );
  });

  const {
    register,
    loading: loadingRegister,
    setError: setErrorRegister,
  } = useCreateUser({
    fetch: fetchUsers,
    close: () => setOpenAddModal(false),
  });

  const { update, loading: loadingUpdate } = useUpdateUser({
    id: selectedItem?.id,
    fetch: fetchUsers,
    close: () => setOpenEditModal(false),
  });

  const { remove: deleteUser, loading: loadingDelete } = useDeleteUser({
    id: selectedItem?.id,
    fetch: fetchUsers,
    close: () => setOpenDeleteModal(false),
  });

  const { toggleStatus } = useToggleUserStatus({
    fetchUsers,
  });

  const { data: roles, loading: loadingRoles } = useFetchRoles();

  const { assignRole } = useAssignRole({
    fetch: fetchUsers,
    close: () => {},
  });

  const { unassignRole } = useUnassignRole({
    fetch: fetchUsers,
    close: () => {},
  });
  const handleRoleChange = async (roleId, checked) => {
    if (!selectedItem) return;

    try {
      if (checked) {
        await assignRole({ user_id: selectedItem.id, role_id: roleId });
      } else {
        await unassignRole({ user_id: selectedItem.id, role_id: roleId });
      }

      // Actualiza selectedItem.roles localmente para reflejar el cambio inmediato
      const updatedRoles = checked
        ? [...(selectedItem.roles || []), { id: roleId }]
        : selectedItem.roles.filter((role) => role.id !== roleId);

      setSelectedItem((prev) => ({
        ...prev,
        roles: updatedRoles,
      }));
    } catch (error) {
      console.error("Error al cambiar rol:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteUser();
  };

  return (
    <div className="space-y-4 w-full">
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
          <Button
            className="w-full md:w-64"
            variant="primary"
            onClick={() => setOpenAddModal(true)}
          >
            Crear Usuario
          </Button>
        </div>
      </div>

      <UserTable
        users={filteredUsers}
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

      <AssignRolesModal
        open={openAssignModal}
        close={() => setOpenAssignModal(false)}
        userRoles={selectedItem?.roles?.map((r) => r.id) || []}
        roles={roles}
        loading={loadingRoles}
        onAssign={handleRoleChange}
        userName={selectedItem?.fullname}
      />

      <ConfirmDeleteDialog
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        onConfirm={handleDelete}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar a ${selectedItem?.fullname}?`}
        loading={loadingDelete}
      />
    </div>
  );
};
