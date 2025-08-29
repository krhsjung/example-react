import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";

import "@example/ui/styles/global";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";

const App = () => {
  const [currentPage, setCurrentPage] = useState<"home" | "login">("login");
  const [user, setUser] = useState<any>(null);

  console.log(`Starting App with page: ${currentPage}`);

  useEffect(() => {
    // 앱 로드 시 URL 파라미터 확인
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const error = urlParams.get('error');
    const userInfo = urlParams.get('user');

    if (error) {
      console.error('Login error:', error);
      // 에러 처리
    } else if (token && userInfo) {
      // 성공적인 로그인
      const userData = JSON.parse(decodeURIComponent(userInfo));
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setCurrentPage("home");
      
      // URL 파라미터 정리
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // 기존 로그인 상태 확인
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage("home");
    }
  }, []);

  const handleSnsLogin = async (provider: string) => {
    console.log(`Logging in with ${provider}`);

    if (provider === "google") {
      // Google 로그인의 경우 직접 리다이렉트
      window.location.href = `https://hsjung.asuscomm.com/example/nestjs/local/api/auth/${provider}`;
    } else {
      // 다른 SNS는 기존 방식
      setCurrentPage("home");
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentPage("login");
  };

  if (currentPage === "login") {
    return <LoginPage onSnsLogin={handleSnsLogin} />;
  }

  return <Home onLogout={handleLogout} user={user} />;
};

createRoot(document.getElementById("app")!).render(<App />);
