import React from "react";
import { SocialProvider } from "@example/shared";
import { SocialLoginButton } from "./social-login-button";
import { LoadingProvider } from "../../hooks";
import "../../styles/auth/social-button-section.css";

export interface SocialButtonSectionProps {
  onSocialLogin?: (provider: SocialProvider) => Promise<void> | void;
  loadingProvider?: LoadingProvider;
  className?: string;
}

export const SocialButtonSection: React.FC<SocialButtonSectionProps> = ({
  onSocialLogin,
  loadingProvider,
  className = "",
}) => {
  return (
    <div
      className={["social-button-section", className].filter(Boolean).join(" ")}
      data-name="Social buttons"
    >
      <SocialLoginButton
        className="button-social"
        provider={SocialProvider.GOOGLE}
        onLogin={onSocialLogin}
        loading={loadingProvider === SocialProvider.GOOGLE}
        disabled={
          loadingProvider !== null && loadingProvider !== SocialProvider.GOOGLE
        }
      />

      <SocialLoginButton
        className="button-social"
        provider={SocialProvider.APPLE}
        onLogin={onSocialLogin}
        loading={loadingProvider === SocialProvider.APPLE}
        disabled={
          loadingProvider !== null && loadingProvider !== SocialProvider.APPLE
        }
      />
    </div>
  );
};
