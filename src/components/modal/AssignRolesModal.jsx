import { Modal } from "../ui/modal/Modal";
import { ModalBody, ModalHeader } from "../ui/modal/slots";
import { Button } from "../ui/button/Button";
import { Skeleton } from "../ui/skeleton/Skeleton";

export const AssignRolesModal = ({
  open,
  close,
  userRoles = [],
  roles = [],
  loading,
  onAssign,
  userName,
}) => {
  return (
    <Modal open={open} onOpenChange={close} size="xl">
      <ModalHeader>Asignar/quitar roles a {userName || "Usuario"}</ModalHeader>
      <ModalBody>
        {loading ? (
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {roles.map((role) => {
              const isAssigned = userRoles.includes(role.id);
              return (
                <Button
                  key={role.id}
                  variant={isAssigned ? "primary" : "outline"}
                  size="md"
                  className="rounded-full "
                  onClick={() => onAssign(role.id, !isAssigned)}
                >
                  {role.name}
                </Button>
              );
            })}
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};
