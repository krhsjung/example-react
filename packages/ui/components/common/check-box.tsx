import React from "react";
import "../../styles/common/check-box.css";
import CheckBoxIcon from "../../icon/check-box.svg?react";
import CheckBoxBlankIcon from "../../icon/check-box-blank.svg?react";

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  size?: "small" | "medium" | "large";
  children?: React.ReactNode;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  disabled = false,
  className = "",
  size = "medium",
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
    size !== "medium" ? size : "",
    disabled ? "disabled" : "",
    checked ? "checked" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <div
        className="checkbox-wrapper"
        onClick={handleChange}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        aria-describedby={id}
      >
        <div className="checkbox-icon">
          {checked ? (
            <CheckBoxIcon width={20} height={20} />
          ) : (
            <CheckBoxBlankIcon width={20} height={20} />
          )}
        </div>
        {children && (
          <label className="checkbox-label" htmlFor={id}>
            {children}
          </label>
        )}
      </div>
    </div>
  );
};
