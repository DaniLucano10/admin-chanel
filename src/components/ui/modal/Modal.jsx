import * as Dialog from '@radix-ui/react-dialog';
import { RiCloseLine } from 'react-icons/ri';
import { cn } from '../../../utils/cn';

export const Modal = ({ open, onOpenChange, title, children, size = 'md' }) => {
  const sizeMap = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
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
          <Dialog.Title className="text-xl font-bold mb-4">
            {title}
          </Dialog.Title>
          
          {children}

          <Dialog.Close asChild>
            <button
              className="text-muted-foreground hover:text-foreground absolute top-4 right-4 inline-flex h-6 w-6 items-center justify-center rounded-full"
              aria-label="Close"
            >
              <RiCloseLine size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

