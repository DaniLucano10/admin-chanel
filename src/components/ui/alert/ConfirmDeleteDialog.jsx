import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { RiCloseLine } from "react-icons/ri";
import { Button } from "../button";

export const ConfirmDeleteDialog = ({ open, onOpenChange, onConfirm }) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
        <AlertDialog.Content className="z-50 fixed top-1/2 left-1/2 w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 rounded-xl shadow-xl">
          <AlertDialog.Title className="text-lg font-bold">
            ¿Estás seguro?
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Esta acción no se puede deshacer. Esto eliminará permanentemente el registro.
          </AlertDialog.Description>

          <div className="mt-6 flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <Button variant="outline">Cancelar</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button variant="danger" onClick={onConfirm}>
                Eliminar
              </Button>
            </AlertDialog.Action>
          </div>

          <AlertDialog.Cancel asChild>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <RiCloseLine size={20} />
            </button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
