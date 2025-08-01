import * as Dialog from "@radix-ui/react-dialog";
import { RiCloseLine } from "react-icons/ri"; // 👈 icono de cerrar
import { cn } from "../../../utils/cn";

export const Modal = ({ open, onOpenChange, children, size = "md" }) => {
  const sizeMap = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-4xl",
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-40" />
        <Dialog.Content
          className={cn(
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-[90vw] max-h-[85vh] p-6",
            "bg-card text-card-foreground rounded-lg shadow-xl",
            "focus:outline-none z-50",
            sizeMap[size],
            "data-[state=open]:animate-contentShow"
          )}
        >
          {/* Botón de cerrar */}
          <Dialog.Close
            className="absolute top-4 right-4 text-gray-400 dark:hover:text-white focus:outline-none cursor-pointer"
            aria-label="Cerrar"
          >
            <RiCloseLine size={24} />
          </Dialog.Close>

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
