import React from "react";
import "../../styles/common/checkbox.css";

const CheckIcon = () => (
  <svg
    className="checkbox-check-icon"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M11.6666 3.5L5.24998 9.91667L2.33331 7"
      stroke="currentColor"
      strokeWidth="1.16667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  disabled = false,
  className = "",
  children,
  id,
}) => {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleChange();
    }
  };

  const containerClasses = [
    "checkbox-container",
    disabled ? "disabled" : "",
    checked ? "checked" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const labelId = id ? `${id}-label` : undefined;

  return (
    <div className={containerClasses}>
      <div
        className="checkbox-icon"
        onClick={handleChange}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        aria-labelledby={labelId}
        id={id}
      >
        {checked && <CheckIcon />}
      </div>
      {children && (
        <span id={labelId} className="checkbox-label">
          {children}
        </span>
      )}
    </div>
  );
};
