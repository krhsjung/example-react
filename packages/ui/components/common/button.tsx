import React from "react";
import "../../styles/common/button.css";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  /** 아이콘 전용 버튼에 필수 - 스크린 리더용 접근성 레이블 */
  "aria-label"?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  fullWidth = false,
  className = "",
  type = "button",
  icon,
  iconPosition = "left",
  loading = false,
  "aria-label": ariaLabel,
}: ButtonProps) => {
  const isIconOnly = icon && !children;

  const buttonClasses = [
    "button",
    fullWidth ? "button-full-width" : "",
    loading ? "button-loading" : "",
    isIconOnly ? "button-icon-only" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderContent = () => {
    if (loading) {
      return <div className="button-spinner" />;
    }

    const iconElement = icon && (
      <span className={`button-icon button-icon-${iconPosition}`}>{icon}</span>
    );

    // Icon only 모드
    if (isIconOnly) {
      return iconElement;
    }

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
      aria-label={ariaLabel}
    >
      <span className="button-content">{renderContent()}</span>
    </button>
  );
};
