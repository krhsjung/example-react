import { createRoot } from "react-dom/client";
import { useState, useEffect, useCallback } from "react";
import "@example/i18n";
import "@example/ui/styles/globals.css";

import LoginPage from "./pages/login";
import Home from "./pages/home";
import { createApiClient } from "@example/utils/api";
import { SocialSignInFlowType, UserDto } from "@example/shared";
import { useTranslation } from "@example/i18n";
import { apiConfig } from "./config";

/* 모듈 수준에서 apiClient 생성 (렌더링마다 재생성 방지) */
const apiClient = createApiClient(apiConfig.authAPI);

const App = () => {
  const { t } = useTranslation();

  // 언어 변경 시 컴포넌트가 리렌더링되면서 자동으로 업데이트됨
  document.title = t("application_name");

  const [user, setUser] = useState<UserDto | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  /* 인증 상태 확인 (마운트 시 한 번만 실행) */
  const checkAuth = useCallback(async () => {
    try {
      const response = await apiClient.get<UserDto>("/me");
      setUser(response);
    } catch {
      setUser(null);
    } finally {
      setCheckingAuth(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLoginSuccess = async (userDto: UserDto) => {
    setUser(userDto);
  };

  const handleLogout = async () => {
    try {
      await apiClient.post("/logout");
      setUser(null);
    } catch (error) {
      /* 로그아웃 실패 시에도 클라이언트 상태 초기화 */
      setUser(null);
    }
  };

  if (checkingAuth) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (user) {
    return <Home onLogout={handleLogout} user={user} />;
  }

  return (
    <LoginPage
      onLoginSuccess={handleLoginSuccess}
      socialSignInFlowType={SocialSignInFlowType.POPUP}
    />
  );
};

const rootElement = document.getElementById("app");
if (!rootElement) {
  throw new Error("Root element 'app' not found");
}
createRoot(rootElement).render(<App />);
