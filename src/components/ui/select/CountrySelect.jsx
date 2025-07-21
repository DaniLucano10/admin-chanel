import { useState, useRef, useEffect } from "react";
import { cn } from "../../../utils/cn";

export const CountrySelect = ({
  options,
  value,
  onChange,
  placeholder = "Select a country",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options?.find((option) => option.id === value);

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-gray-200 dark:bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        {selectedOption ? (
          <div className="flex items-center">
            <img
              src={`https://flagcdn.com/w20/${selectedOption.code.toLowerCase()}.png`}
              alt={selectedOption.name}
              className="mr-2"
            />
            {selectedOption.name}
          </div>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
        {/* Chevron Icon */}
        <svg
          className={`h-5 w-5 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-gray-300 dark:bg-background p-2">
          <ul className="max-h-60 overflow-auto rounded-md py-1 text-base ring-opacity-5 focus:outline-none sm:text-sm">
            {options?.map((option) => (
              <li
                key={option.code}
                className="relative cursor-default select-none py-2 pl-3 pr-9 text-foreground hover:bg-muted"
                onClick={() => handleSelect(option)}
              >
                <div className="flex items-center">
                  <img
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt={option.name}
                    className="mr-2"
                  />
                  <span className="font-normal block truncate">
                    {option.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

