import React, { useState } from "react";
import { LoginForm, SignupPopup } from "@example/ui";
import { SnsSignInFlowType, SnsProvider } from "@example/shared";
import { env, apiConfig, appConfig } from "../config";
import { createApiClient } from "@example/utils/api";
import { LoginProvider } from "@example/shared";

interface LoginPageProps {
  snsSignInFlowType?: SnsSignInFlowType;
  onLoginSuccess?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  snsSignInFlowType,
  onLoginSuccess,
}) => {
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const apiClient = createApiClient(apiConfig.baseURL);

  const handleLogin = async (email: string, password: string) => {
    try {
      await apiClient.post("/auth/login", { email, password });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      return;
    }

    onLoginSuccess?.();
  };

  const handleSnsLogin = async (provider: SnsProvider): Promise<void> => {
    console.log(`Logging in with ${provider}`);

    const url = `${apiConfig.authAPI}/${provider}?flow=${snsSignInFlowType}&origin=${encodeURIComponent(window.location.origin)}`;
    console.log(url);
    // 리다이렉트 방식
    if (snsSignInFlowType === SnsSignInFlowType.REDIRECT) {
      window.location.href = url;
      return;
    }

    // 팝업 방식
    const width = provider === SnsProvider.GOOGLE ? "500" : "600";
    const height = "600";
    const popup = window.open(
      url,
      `Connect ${provider} account`,
      `width=${width},height=${height} ,left=${window.screenX + (window.outerWidth - parseInt(width)) / 2},top=${window.screenY + (window.outerHeight - parseInt(height)) / 2}`
    );

    return new Promise<void>((resolve, reject) => {
      if (!popup) {
        return reject(new Error("Popup blocked"));
      }

      let isResolved = false;

      const cleanup = () => {
        if (timer) {
          clearInterval(timer);
        }
        window.removeEventListener("message", onMessage);
      };

      const onMessage = (e: MessageEvent) => {
        console.log("Received message from popup:", e.data);
        if (e.origin !== env.API_ORIGIN) return;

        const messageType = e.data?.type;
        if (messageType === "oauth:done" || messageType === "oauth:error") {
          if (isResolved) return;
          isResolved = true;

          if (messageType === "oauth:done") {
            onLoginSuccess?.();
          }

          cleanup();
          resolve();
          popup.close();
        }
      };

      window.addEventListener("message", onMessage);

      const timer = setInterval(() => {
        try {
          if (popup && popup.closed) {
            if (isResolved) return;
            isResolved = true;
            cleanup();
            console.log("Popup was closed by user");
            resolve(); // 사용자가 닫은 것도 정상 완료로 처리
          }
        } catch (error) {
          // COOP 정책으로 인해 popup.closed 접근이 차단될 수 있음
          // 이 경우 에러를 무시하고 계속 진행
        }
      }, 1_000);
    });
  };

  const handleSignup = async (
    email: string,
    password: string,
    name: string
  ): Promise<void> => {
    try {
      await apiClient.post("/user", {
        email,
        password,
        name,
        provider: LoginProvider.EMAIL,
      });

      await apiClient.post("/auth/login", { email, password });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      return;
    }

    // 회원가입 로직 구현
    setShowSignupPopup(false);
    onLoginSuccess?.();
  };

  return (
    <>
      <LoginForm
        appName={appConfig.name}
        onLogin={handleLogin}
        onSnsLogin={handleSnsLogin}
        onSignUp={() => setShowSignupPopup(true)}
        snsSignInFlowType={snsSignInFlowType}
      />
      <SignupPopup
        isOpen={showSignupPopup}
        onClose={() => setShowSignupPopup(false)}
        onSignUp={handleSignup}
        onSnsLogin={handleSnsLogin}
      />
    </>
  );
};

export default LoginPage;
