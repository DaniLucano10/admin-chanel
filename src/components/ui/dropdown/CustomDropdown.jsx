import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const CustomDropdown = ({ trigger, children }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="min-w-[200px] rounded-lg mt-4 bg-sidebar dark:bg-sidebar p-2 shadow-md z-50"
        sideOffset={8}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export const DropdownItem = ({ children, onClick, className }) => (
  <DropdownMenu.Item
    onClick={onClick}
    className={`px-4 py-2 hover:bg-sidebar-accent dark:hover:bg-sidebar-accent rounded-md cursor-pointer ${className}`}
  >
    {children}
  </DropdownMenu.Item>
);

export const DropdownSeparator = () => (
  <DropdownMenu.Separator className="my-2 h-px bg-gray-300 dark:bg-gray-600" />
);
