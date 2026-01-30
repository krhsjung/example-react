import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import "@example/i18n";

import LoginPage from "./pages/login";
import Home from "./pages/home";
import { createApiClient } from "@example/utils/api";
import { SnsSignInFlowType } from "@example/shared";
import { useTranslation } from "@example/i18n";
import { apiConfig } from "./config";

type Page = "home" | "login";

const App = () => {
  const { t } = useTranslation();

  // 언어 변경 시 컴포넌트가 리렌더링되면서 자동으로 업데이트됨
  document.title = t("application_name");

  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const apiClient = createApiClient(apiConfig.authAPI);

  const fetchUserInfo = async () => {
    const response = await apiClient.get("/me");
    setUser(response);
    return response;
  };

  const checkAuth = async () => {
    try {
      await fetchUserInfo();
      setCurrentPage("home");
    } catch (error) {
      setUser(null);
      setCurrentPage("login");
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLoginSuccess = async () => {
    checkAuth();
  };

  const handleLogout = async () => {
    try {
      await apiClient.post("/logout");
    } catch (error) {}

    checkAuth();
  };

  if (checkingAuth) {
    return <div></div>;
  }

  if (currentPage === "login") {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        snsSignInFlowType={SnsSignInFlowType.POPUP}
      />
    );
  }

  return <Home onLogout={handleLogout} user={user} />;
};

createRoot(document.getElementById("app")!).render(<App />);
