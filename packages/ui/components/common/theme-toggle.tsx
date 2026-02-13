import React, { useState, useEffect, useRef } from "react";
import { getInitialTheme, Theme } from "@example/utils";
import { useTranslation } from "@example/i18n";
import "../../styles/common/theme-toggle.css";
import darkIcon from "../../icon/dark.svg";
import lightIcon from "../../icon/light.svg";

export interface ThemeToggleProps {
  className?: string;
  onChange?: (theme: Theme) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  onChange,
}) => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    /* localStorage 접근 시 오류 처리 (Private browsing 모드 등) */
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* localStorage 접근 불가 시 무시 (테마는 세션 동안만 유지) */
    }
    onChangeRef.current?.(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      className={`mode-button ${className}`}
      onClick={toggleTheme}
      aria-label={
        theme === "light" ? t("switch_to_dark_mode") : t("switch_to_light_mode")
      }
    >
      <img
        src={theme === "light" ? darkIcon : lightIcon}
        alt={theme === "light" ? "Dark mode" : "Light mode"}
        width={40}
        height={40}
      />
    </button>
  );
};
