import { cn } from "../../../utils/cn";
import {
  RiAlertLine,
  RiCheckLine,
  RiErrorWarningLine,
  RiInformationLine,
} from "react-icons/ri";

const icons = {
  success: (
    <RiCheckLine className="w-5 h-5 text-green-600 dark:text-green-400" />
  ),
  error: (
    <RiErrorWarningLine className="w-5 h-5 text-red-600 dark:text-red-400" />
  ),
  warning: (
    <RiAlertLine className="w-5 h-5 text-yellow-600 dark:text-yellow-300" />
  ),
  info: (
    <RiInformationLine className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
  ),
};

const alertStyles = {
  success:
    "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  error: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
  warning:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
  info: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-300",
};

export const Alert = ({
  type = "info",
  title,
  message,
  className = "",
  icon = true,
}) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border border-black/10 dark:border-white/10",
        alertStyles[type],
        className
      )}
    >
      {icon && <div className="mt-1">{icons[type]}</div>}
      <div className="flex-1">
        {title && <h4 className="font-semibold">{title}</h4>}
        {message && <p className="text-sm leading-tight mt-1">{message}</p>}
      </div>
    </div>
  );
};
