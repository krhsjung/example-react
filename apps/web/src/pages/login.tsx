import React, { useState, useCallback, useRef, useEffect } from "react";
import { LoginForm, SignupModal, Toast } from "@example/ui";
import { SocialSignInFlowType, SocialProvider, UserDto } from "@example/shared";
import { useTranslation } from "@example/i18n";
import { env, apiConfig } from "../config";
import { ApiError, createApiClient, OAUTH } from "@example/utils";
import { LoginProvider } from "@example/shared";
import "@example/i18n";

interface LoginPageProps {
  socialSignInFlowType?: SocialSignInFlowType;
  onLoginSuccess?: (userDto: UserDto) => void;
}

/* OAuth 팝업 사이즈 설정 */
const OAUTH_POPUP_SIZE = {
  [SocialProvider.GOOGLE]: { width: 500, height: 600 },
  [SocialProvider.APPLE]: { width: 600, height: 600 },
} as const;

/* OAuth 메시지 타입 검증 */
type OAuthMessageType = "oauth:done" | "oauth:error";
const isValidOAuthMessage = (type: unknown): type is OAuthMessageType =>
  type === "oauth:done" || type === "oauth:error";

/* 모듈 수준에서 apiClient 생성 (렌더링마다 재생성 방지) */
const apiClient = createApiClient(apiConfig.baseURL);

const LoginPage: React.FC<LoginPageProps> = ({
  socialSignInFlowType,
  onLoginSuccess,
}) => {
  const { t } = useTranslation();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const oauthCleanupRef = useRef<(() => void) | null>(null);

  /* 컴포넌트 언마운트 시 OAuth 타이머 정리 */
  useEffect(() => {
    return () => {
      oauthCleanupRef.current?.();
    };
  }, []);

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      try {
        const userDto: UserDto = await apiClient.post<UserDto>("/auth/login", {
          email,
          password,
        });
        onLoginSuccess?.(userDto);
      } catch (error) {
        if (error instanceof ApiError) {
          const errorId = error.data?.id as string | undefined;
          setErrorMessage(t(errorId ?? "error_unknown"));
        }
        return;
      }
    },
    [onLoginSuccess, t],
  );

  const handleSnsLogin = useCallback(
    async (provider: SocialProvider): Promise<void> => {
      const url = `${apiConfig.authAPI}/${provider}?flow=${socialSignInFlowType}&origin=${encodeURIComponent(window.location.origin)}`;

      // 리다이렉트 방식
      if (socialSignInFlowType === SocialSignInFlowType.REDIRECT) {
        window.location.href = url;
        return;
      }

      // 팝업 방식
      const { width, height } = OAUTH_POPUP_SIZE[provider];
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      const popup = window.open(
        url,
        `Connect ${provider} account`,
        `width=${width},height=${height},left=${left},top=${top}`,
      );

      return new Promise<void>((resolve, reject) => {
        if (!popup) {
          return reject(new Error("Popup blocked"));
        }

        const controller = new AbortController();
        let timer: ReturnType<typeof setInterval> | null = null;

        const cleanup = () => {
          controller.abort();
          if (timer) {
            clearInterval(timer);
            timer = null;
          }
          oauthCleanupRef.current = null;
        };

        oauthCleanupRef.current = cleanup;

        const onMessage = (e: MessageEvent) => {
          if (e.origin !== env.API_ORIGIN) return;

          const messageType = e.data?.type;
          if (!isValidOAuthMessage(messageType)) return;

          if (messageType === "oauth:done") {
            const userDto: UserDto = e.data.user;
            onLoginSuccess?.(userDto);
          } else if (messageType === "oauth:error") {
            const errorId =
              typeof e.data?.error?.id === "string"
                ? e.data.error.id
                : "error_oauth_callback_failed";
            setErrorMessage(t(errorId));
          }

          cleanup();
          resolve();
          popup.close();
        };

        window.addEventListener("message", onMessage, {
          signal: controller.signal,
        });

        timer = setInterval(() => {
          try {
            if (popup && popup.closed) {
              cleanup();
              resolve(); /* 사용자가 닫은 것도 정상 완료로 처리 */
            }
          } catch {
            /* COOP 정책으로 인해 popup.closed 접근이 차단될 수 있음 */
          }
        }, OAUTH.POLLING_INTERVAL_MS);
      });
    },
    [socialSignInFlowType, onLoginSuccess, t],
  );

  const handleSignup = useCallback(
    async (email: string, password: string, name: string): Promise<void> => {
      try {
        const userDto: UserDto = await apiClient.post<UserDto>(
          "/auth/register",
          {
            email,
            password,
            name,
            provider: LoginProvider.EMAIL,
          },
        );
        onLoginSuccess?.(userDto);
        setShowSignupModal(false);
      } catch (error) {
        if (error instanceof ApiError) {
          const errorId = error.data?.id as string | undefined;
          setErrorMessage(t(errorId ?? "error_unknown"));
        }
        return;
      }
    },
    [onLoginSuccess, t],
  );

  return (
    <>
      {errorMessage && (
        <Toast
          message={errorMessage}
          type="error"
          onClose={() => setErrorMessage(null)}
        />
      )}
      <LoginForm
        onLogin={handleLogin}
        onSocialLogin={handleSnsLogin}
        onSignup={() => setShowSignupModal(true)}
        socialSignInFlowType={socialSignInFlowType}
      />
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSignUp={handleSignup}
        onSocialLogin={handleSnsLogin}
      />
    </>
  );
};

export default LoginPage;
