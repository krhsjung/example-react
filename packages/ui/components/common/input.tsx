import React, { HTMLInputTypeAttribute, useState } from "react";
import "../../styles/common/input.css";
import EyeIcon from "../../icon/eye.svg?react";
import EyeOffIcon from "../../icon/eye-off.svg?react";

export interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: HTMLInputTypeAttribute | undefined;
  disabled?: boolean;
  className?: string;
  size?: "small" | "medium" | "large";
  state?: "default" | "error" | "success";
  showPasswordToggle?: boolean;
}

export const Input: React.FC<InputProps> = ({
  placeholder = "text",
  value = "",
  onChange,
  type = "text",
  disabled = false,
  className = "",
  size = "medium",
  state = "default",
  showPasswordToggle = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const shouldShowToggle = showPasswordToggle && type === "password";
  const inputType = shouldShowToggle && isPasswordVisible ? "text" : type;

  const containerClasses = [
    "input-container",
    size !== "medium" ? size : "",
    state !== "default" ? state : "",
    disabled ? "disabled" : "",
    shouldShowToggle ? "with-toggle" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <div className="input-border" aria-hidden="true" />
      <div className="input-wrapper">
        <div className="input-inner">
          <input
            type={inputType}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            className="input-field"
          />
          {shouldShowToggle && (
            <button
              type="button"
              className="input-password-toggle"
              onClick={togglePasswordVisibility}
              disabled={disabled}
              aria-label={isPasswordVisible ? "Show password" : "Hide password"}
            >
              {isPasswordVisible ? (
                <EyeIcon width={20} height={20} />
              ) : (
                <EyeOffIcon width={20} height={20} />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
