import { cn } from "../../../utils/cn";

export const IconButton = ({
  children,
  size = "md",
  variant = "primary",
  className = "",
  rounded = "full", 
  ...props
}) => {
  const sizeMap = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-14 h-14 text-xl",
  };

  const variantMap = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
    secondary:
      "bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600",
    success:
      "bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600",
    danger:
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
    warning:
      "bg-yellow-400 text-black hover:bg-yellow-500 dark:bg-yellow-300 dark:hover:bg-yellow-400",
    info:
      "bg-cyan-600 text-white hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600",
    outline:
      "bg-transparent border border-gray-500 text-gray-700 hover:bg-gray-100 dark:border-gray-400 dark:text-gray-200 dark:hover:bg-gray-800",
  };

  const roundedMap = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center transition duration-200 cursor-pointer",
        sizeMap[size],
        variantMap[variant],
        roundedMap[rounded],
        className
      )}
    >
      {children}
    </button>
  );
};
