import { Modal } from "../ui";

export const AssignPermissionModal = ({
  open,
  close,
  rolesPermissions,
  selectedItem,
  permissions = [],
  onAssign,
  loading,
}) => {
  console.log("Permisos asignados:", rolesPermissions);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    onAssign({ permissionId: parseInt(value), checked });
  };

  return (
    <Modal
      open={open}
      onOpenChange={close}
      title={`Asignar Permisos a ${selectedItem?.name}`}
      size="md"
    >
      <div className="p-4">
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {permissions.map((permission) => (
              <div
                key={permission.id}
                className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <input
                  type="checkbox"
                  id={`perm-${permission.id}`}
                  value={permission.id}
                  checked={rolesPermissions.includes(permission.id)}
                  onChange={handleCheckboxChange}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`perm-${permission.id}`}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  {permission.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
