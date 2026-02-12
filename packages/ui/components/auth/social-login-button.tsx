import React from "react";
import { Button } from "@example/ui";
import { SocialProvider } from "@example/shared";

/* Google Icon - 구글 로그인 버튼 아이콘 */
const GoogleIcon = () => (
  <svg
    className="social-icon social-icon-google"
    width="20"
    height="20"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M30.08 16.3333C30.08 15.2933 29.9867 14.2933 29.8133 13.3333H16V19.0133H23.8933C23.5467 20.84 22.5067 22.3867 20.9467 23.4267V27.12H25.7067C28.48 24.56 30.08 20.8 30.08 16.3333Z"
      fill="currentColor"
    />
    <path
      d="M16 30.6667C19.96 30.6667 23.28 29.36 25.7067 27.12L20.9467 23.4267C19.64 24.3067 17.9733 24.84 16 24.84C12.1867 24.84 8.94668 22.2667 7.78668 18.8H2.90668V22.5867C5.32001 27.3733 10.2667 30.6667 16 30.6667Z"
      fill="currentColor"
    />
    <path
      d="M7.78668 18.7867C7.49334 17.9067 7.32001 16.9733 7.32001 16C7.32001 15.0267 7.49334 14.0933 7.78668 13.2133V9.42667H2.90668C1.90668 11.4 1.33334 13.6267 1.33334 16C1.33334 18.3733 1.90668 20.6 2.90668 22.5733L6.70668 19.6133L7.78668 18.7867Z"
      fill="currentColor"
    />
    <path
      d="M16 7.17334C18.16 7.17334 20.08 7.92 21.6133 9.36L25.8133 5.16C23.2667 2.78667 19.96 1.33334 16 1.33334C10.2667 1.33334 5.32001 4.62667 2.90668 9.42667L7.78668 13.2133C8.94668 9.74667 12.1867 7.17334 16 7.17334Z"
      fill="currentColor"
    />
  </svg>
);

/* Apple Icon - 애플 로그인 버튼 아이콘 */
const AppleIcon = () => (
  <svg
    className="social-icon social-icon-apple"
    width="20"
    height="20"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M22.364 0.016014C22.296 -0.059986 19.846 0.0460141 17.714 2.36001C15.582 4.67201 15.91 7.32401 15.958 7.39201C16.006 7.46001 18.998 7.56601 20.908 4.87601C22.818 2.18601 22.432 0.094014 22.364 0.016014ZM28.992 23.482C28.896 23.29 24.342 21.014 24.766 16.638C25.19 12.26 28.116 11.06 28.162 10.93C28.208 10.8 26.968 9.35001 25.654 8.61601C24.6892 8.09852 23.6215 7.80203 22.528 7.74801C22.312 7.74201 21.562 7.55801 20.02 7.98001C19.004 8.25801 16.714 9.15801 16.084 9.19401C15.452 9.23001 13.572 8.15001 11.55 7.86401C10.256 7.61401 8.884 8.12601 7.902 8.52001C6.922 8.91201 5.058 10.028 3.754 12.994C2.45 15.958 3.132 20.654 3.62 22.114C4.108 23.572 4.87 25.962 6.166 27.706C7.318 29.674 8.846 31.04 9.484 31.504C10.122 31.968 11.922 32.276 13.17 31.638C14.174 31.022 15.986 30.668 16.702 30.694C17.416 30.72 18.824 31.002 20.266 31.772C21.408 32.166 22.488 32.002 23.57 31.562C24.652 31.12 26.218 29.444 28.046 26.046C28.74 24.466 29.056 23.612 28.992 23.482Z"
      fill="currentColor"
    />
  </svg>
);

/* Provider별 아이콘 컴포넌트 매핑 */
const PROVIDER_ICONS: Record<SocialProvider, React.FC> = {
  [SocialProvider.GOOGLE]: GoogleIcon,
  [SocialProvider.APPLE]: AppleIcon,
};

export interface SocialLoginButtonProps {
  provider: SocialProvider;
  onLogin?: (provider: SocialProvider) => Promise<void> | void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onLogin,
  loading = false,
  disabled = false,
  className = "",
  children,
}) => {
  /* Button 컴포넌트가 disabled/loading 상태를 처리하므로 여기서는 onLogin만 호출 */
  const handleClick = () => {
    onLogin?.(provider);
  };

  const IconComponent = PROVIDER_ICONS[provider];

  return (
    <Button
      className={className}
      onClick={handleClick}
      loading={loading}
      disabled={disabled}
      icon={<IconComponent />}
      iconPosition="left"
    >
      {children}
    </Button>
  );
};
