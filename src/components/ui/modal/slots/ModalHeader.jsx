import * as Dialog from "@radix-ui/react-dialog";
import { RiCloseLine } from "react-icons/ri";

export const ModalHeader = ({ children }) => (
  <div className="flex items-center justify-between pb-4 border-b border-border">
    <Dialog.Title className="text-xl font-bold">{children}</Dialog.Title>
    <Dialog.Close asChild></Dialog.Close>
  </div>
);
