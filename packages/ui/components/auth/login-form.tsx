import React from "react";
import { Button, Divider, Input, ThemeToggle } from "@example/ui";
import { SocialButtonSection } from "./social-button-section";
import {
  SocialProvider,
  LoginProvider,
  SocialSignInFlowType,
} from "@example/shared";
import { useTranslation } from "@example/i18n";
import { useAuthForm, LoadingProvider } from "../../hooks";
import "../../styles/auth/login-form.css";

/* Title Section */
const TitleSection = () => {
  const { t } = useTranslation();
  return (
    <div className="login-title-section" data-name="Title Section">
      <div className="login-title">{t("application_name")}</div>
      <div className="login-subtitle">{t("login_subtitle")}</div>
    </div>
  );
};

/* Credentials Section */
interface CredentialsSectionProps {
  email: string;
  password: string;
  emailError: string | null;
  passwordError: string | null;
  onEmailChange: (value: string) => void;
  onEmailBlur: () => void;
  onPasswordChange: (value: string) => void;
  onPasswordBlur: () => void;
  onSubmit: () => Promise<void>;
  onForgotPassword?: () => void;
  loadingProvider: LoadingProvider;
}

const CredentialsSection: React.FC<CredentialsSectionProps> = ({
  email,
  password,
  emailError,
  passwordError,
  onEmailChange,
  onEmailBlur,
  onPasswordChange,
  onPasswordBlur,
  onSubmit,
  onForgotPassword,
  loadingProvider,
}) => {
  const { t } = useTranslation();
  return (
    <div className="login-credentials-section" data-name="Credentials Section">
      <div className="login-credentials-container">
        <label
          htmlFor="login-email"
          className="login-credentials-container-name"
        >
          {t("email")}
        </label>
        <Input
          id="login-email"
          placeholder={t("placeholder_email")}
          type="email"
          value={email}
          showPasswordToggle={false}
          onChange={onEmailChange}
          onBlur={onEmailBlur}
          state={emailError !== null ? "error" : "default"}
          errorId="login-email-error"
        />
        {emailError && (
          <div id="login-email-error" className="text-error" role="alert">
            {emailError}
          </div>
        )}
      </div>
      <div className="login-credentials-container">
        <label
          htmlFor="login-password"
          className="login-credentials-container-name"
        >
          {t("password")}
        </label>
        <Input
          id="login-password"
          placeholder={t("placeholder_password")}
          type="password"
          value={password}
          showPasswordToggle={true}
          onChange={onPasswordChange}
          onBlur={onPasswordBlur}
          state={passwordError !== null ? "error" : "default"}
          errorId="login-password-error"
        />
        {passwordError && (
          <div id="login-password-error" className="text-error" role="alert">
            {passwordError}
          </div>
        )}
      </div>

      <Button
        className="text-link login-forgot-password"
        onClick={onForgotPassword}
      >
        {t("login_forget_password")}
      </Button>
      <Button
        className="button-primary"
        onClick={onSubmit}
        loading={loadingProvider === LoginProvider.EMAIL}
        disabled={loadingProvider !== null}
      >
        {t("login")}
      </Button>
    </div>
  );
};

/* Signup Section */
interface SignupSectionProps {
  onSignup?: () => Promise<void> | void;
}

const SignupSection: React.FC<SignupSectionProps> = ({ onSignup }) => {
  const { t } = useTranslation();
  return (
    <div className="login-signup-section" data-name="Sign Up">
      <div className="text-secondary">{t("login_no_account")}</div>
      <Button className="text-link login-signup-link" onClick={onSignup}>
        {t("signup")}
      </Button>
    </div>
  );
};

/* Login Form Content */
interface LoginFormContentProps {
  onLogin?: (email: string, password: string) => Promise<void> | void;
  onSocialLogin?: (provider: SocialProvider) => Promise<void> | void;
  onSignup?: () => Promise<void> | void;
  onForgotPassword?: () => void;
  socialSignInFlowType?: SocialSignInFlowType;
}

const LoginFormContent: React.FC<LoginFormContentProps> = ({
  onLogin,
  onSocialLogin,
  onSignup,
  onForgotPassword,
  socialSignInFlowType,
}) => {
  const { t } = useTranslation();
  const {
    formData,
    errors,
    loadingProvider,
    handleChange,
    handleBlur,
    handleEmailSubmit,
    handleSocialSubmit,
  } = useAuthForm({
    mode: "login",
    onLogin,
    onSocialLogin,
    socialSignInFlowType,
  });

  return (
    <div className="login-form-content" data-name="Login Content">
      <TitleSection />
      <CredentialsSection
        email={formData.email}
        password={formData.password}
        emailError={errors.email}
        passwordError={errors.password}
        onEmailChange={(value) => handleChange("email", value)}
        onEmailBlur={() => handleBlur("email")}
        onPasswordChange={(value) => handleChange("password", value)}
        onPasswordBlur={() => handleBlur("password")}
        onSubmit={handleEmailSubmit}
        onForgotPassword={onForgotPassword}
        loadingProvider={loadingProvider}
      />
      <Divider text={t("login_continue_with")} />
      <SocialButtonSection
        onSocialLogin={handleSocialSubmit}
        loadingProvider={loadingProvider}
      />
      <SignupSection onSignup={onSignup} />
    </div>
  );
};

/* Login Form */
export interface LoginFormProps {
  onLogin?: (email: string, password: string) => Promise<void> | void;
  onSocialLogin?: (provider: SocialProvider) => Promise<void> | void;
  onSignup?: () => Promise<void> | void;
  onForgotPassword?: () => void;
  socialSignInFlowType?: SocialSignInFlowType;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onSocialLogin,
  onSignup,
  onForgotPassword,
  socialSignInFlowType,
}) => {
  return (
    <div className="login-form" data-name="Login form">
      <ThemeToggle className="mode-button-top-right" />
      <LoginFormContent
        onLogin={onLogin}
        onSocialLogin={onSocialLogin}
        onSignup={onSignup}
        onForgotPassword={onForgotPassword}
        socialSignInFlowType={socialSignInFlowType}
      />
    </div>
  );
};
