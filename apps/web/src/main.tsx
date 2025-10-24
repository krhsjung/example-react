import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";

import LoginPage from "./pages/login";
import Home from "./pages/home";
import { createApiClient } from "@example/utils/api";
import { SnsSignInFlowType } from "@example/shared";
import { apiConfig, appConfig } from "./config";

type Page = "home" | "login";

const App = () => {
  document.title = appConfig.name;

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
      await apiClient.get("/logout");
    } catch (error) {}

    checkAuth();
  };

  if (checkingAuth) {
    return <div>checking...</div>;
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
