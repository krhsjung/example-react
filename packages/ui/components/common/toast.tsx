import React, { useEffect, useCallback } from "react";
import "../../styles/common/toast.css";

export interface ToastProps {
  message: string;
  type?: "error" | "success" | "info";
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "error",
  duration = 4000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <div
      className={`toast toast-${type}`}
      role="alert"
      aria-live="assertive"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <span className="toast-message">{message}</span>
      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
        type="button"
      >
        ×
      </button>
    </div>
  );
};
