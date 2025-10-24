import React from "react";
import "../../styles/common/button.css";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  background?: string;
  color?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  children,
  onClick,
  disabled = false,
  fullWidth = false,
  className = "",
  type = "button",
  icon,
  iconPosition = "left",
  loading = false,
  background,
  color,
}: ButtonProps) => {
  const buttonClasses = [
    "button",
    background ? "button-custom" : `button-${variant}`,
    `button-${size}`,
    fullWidth ? "button-full-width" : "",
    loading ? "button-loading" : "",
    disabled ? "disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const customStyle = background
    ? ({
        "--button-bg": background,
        "--button-color": color || "black",
      } as React.CSSProperties)
    : undefined;

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <div className="button-spinner" />
          <span className="button-text">Loading...</span>
        </>
      );
    }

    const iconElement = icon && (
      <span className={`button-icon button-icon-${iconPosition}`}>{icon}</span>
    );

    return (
      <>
        {iconPosition === "left" && iconElement}
        <span className="button-text">{children}</span>
        {iconPosition === "right" && iconElement}
      </>
    );
  };

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      style={customStyle}
    >
      <div className="button-border" aria-hidden="true" />
      <div className="button-content">{renderContent()}</div>
    </button>
  );
};
