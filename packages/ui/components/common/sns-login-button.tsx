import React from "react";
import { Button } from "@example/ui";
import { SnsProvider } from "@example/shared";
import "../../styles/common/sns-login-button.css";

export interface SnsLoginButtonProps {
  provider: SnsProvider;
  onLogin?: (provider: SnsProvider) => Promise<void> | void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  timeout?: number;
}

export const SnsLoginButton: React.FC<SnsLoginButtonProps> = ({
  provider,
  onLogin,
  loading = false,
  disabled = false,
  className = "",
  children,
  icon,
}) => {
  const handleClick = () => {
    if (!disabled && !loading && onLogin) {
      onLogin(provider);
    }
  };

  const containerClasses = [
    "sns-login-button",
    disabled ? "disabled" : "",
    loading ? "loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <div className="sns-login-button-border" aria-hidden="true" />
      <Button
        variant="secondary"
        fullWidth
        onClick={handleClick}
        loading={loading}
        disabled={disabled}
        icon={icon}
        iconPosition="left"
      >
        {children}
      </Button>
    </div>
  );
};
