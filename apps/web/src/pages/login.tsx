import React from "react";
import { LoginForm } from "@example/ui";
import { SnsSignInFlowType, SnsProvider } from "@example/shared";
import { env, apiConfig, appConfig } from "../config";

interface LoginPageProps {
  snsSignInFlowType?: SnsSignInFlowType;
  onLoginSuccess?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  snsSignInFlowType,
  onLoginSuccess,
}) => {
  const handleLogin = async (email: string, password: string) => {
    const url = `${apiConfig.authAPI}/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
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
        if (popup && popup.closed) {
          if (isResolved) return;
          isResolved = true;
          cleanup();
          console.log("Popup was closed by user");
          resolve(); // 사용자가 닫은 것도 정상 완료로 처리
        }
      }, 1_000);
    });
  };

  return (
    <LoginForm
      appName={appConfig.name}
      onLogin={handleLogin}
      onSnsLogin={handleSnsLogin}
      onSignUp={() => {
        console.log(`Show Signing up popup`);
      }}
      snsSignInFlowType={snsSignInFlowType}
    />
  );
};

export default LoginPage;
