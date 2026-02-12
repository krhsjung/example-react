export type Theme = "light" | "dark";

/* 유효한 테마 값인지 검증 */
const isValidTheme = (value: string | null): value is Theme =>
  value === "light" || value === "dark";

export const getTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";

export const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  /* localStorage 접근 시 오류 처리 (Private browsing 모드 등) */
  try {
    const savedTheme = localStorage.getItem("theme");
    if (isValidTheme(savedTheme)) return savedTheme;
  } catch {
    /* localStorage 접근 불가 시 시스템 설정 사용 */
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};
