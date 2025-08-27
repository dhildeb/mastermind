import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

interface CustomDropdownProps {
  options: string[];
  label?: string;
  placeholder?: string;
  width?: string;
  onChange?: (value: string) => void;
  value?: string;
}

const CustomDropdown = ({
  options,
  width = "w-8",
  onChange,
  value,
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(options.find((option) => option === value) || null)

  const handleSelect = (selectedValue: string) => {
    setIsOpen(false);
    onChange?.(selectedValue);
    setSelectedOption(options.find((option) => option === selectedValue) || null)
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col" ref={dropdownRef}>
      <div className={clsx("relative", width)}>
        <span onClick={() => setIsOpen(!isOpen)} className={`cursor-pointer size-4 rounded-full bg-${selectedOption || 'stone'}-500`}>&ensp;&ensp;&ensp;</span>
        {isOpen && (
          <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border border-gray-300 bg-white shadow-lg">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className={clsx(
                  "cursor-pointer p-0 pl-1 text-sm text-gray-700 hover:bg-blue-100",
                  value === option && "bg-blue-50 font-medium"
                )}
              >
                <span className={`size-4 rounded-full bg-${option}-500`}>&ensp;&ensp;&ensp;</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;