import { Button, Input, Modal, Skeleton } from "../ui";
import { ModalBody, ModalHeader } from "../ui/modal/slots";

export const AssignPermissionModal = ({
  open,
  close,
  rolesPermissions,
  selectedItem,
  permissions = [],
  onAssign,
  loading,
}) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    onAssign({ permissionId: parseInt(value), checked });
  };

  // Módulos en el orden deseado
  const orderedModules = [
    "USERS",
    "CUSTOMERS",
    "DASHBOARD",
    "SETTINGS",
    // Agrega más si lo necesitas
  ];

  // Alias para agrupar múltiples guard_name bajo un mismo grupo
  const moduleAliasMap = {
    user: "USERS",
    users: "USERS",
    customers: "CUSTOMERS",
    dashboard: "DASHBOARD",
    settings: "SETTINGS",
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    const [module] = permission.guard_name.split(".");
    const normalized = moduleAliasMap[module] || module.toUpperCase();
    if (!acc[normalized]) acc[normalized] = [];
    acc[normalized].push(permission);
    return acc;
  }, {});

  return (
    <Modal open={open} onOpenChange={close} size="2xl">
      <ModalHeader>
        Asignar/quitar permisos al rol {selectedItem?.name}
      </ModalHeader>
      <ModalBody>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start h-full">
            {orderedModules.map((module) => {
              const perms = groupedPermissions[module];
              if (!perms) return null;

              return (
                <div
                  key={module}
                  className="pl-4 border-l border-blue-600 dark:border-white"
                >
                  <h3 className="text-sm text-blue-700 dark:text-blue-500 font-bold uppercase mb-2">
                    {module}
                  </h3>
                  <div className="space-y-2">
                    {perms.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-center gap-2"
                      >
                        <Input
                          type="checkbox"
                          id={`perm-${permission.id}`}
                          value={permission.id}
                          checked={rolesPermissions.includes(permission.id)}
                          onChange={handleCheckboxChange}
                          className="h-5 w-5 rounded border-gray-300 text-its-primary focus:ring-its-primary"
                        />
                        <label
                          htmlFor={`perm-${permission.id}`}
                          className="text-sm text-gray-800 dark:text-gray-300 cursor-pointer"
                        >
                          {permission.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};
