import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  InputProps,
  SnsLoginButton,
} from "@example/ui";
import { SnsProvider, LoginProvider, SnsSignInFlowType } from "@example/shared";
import { sha256 } from "@example/utils";
import "../../styles/login.css";
import GoogleIcon from "../../icon/google.svg?react";
import AppleIcon from "../../icon/apple.svg?react";

/* Header */
interface LogoTextProps {
  logoText: string;
}

const Logo: React.FC<LogoTextProps> = ({ logoText }) => {
  return (
    <div className="login-logo" data-name="logo">
      {logoText}
    </div>
  );
};

const Header: React.FC<LogoTextProps> = ({ logoText }) => {
  return (
    <div className="login-header" data-name="Header">
      <Logo logoText={logoText} />
    </div>
  );
};
/* Header */

/* Body */
const DescriptionSection = () => {
  return (
    <div className="login-body-description-section" data-name="Description">
      <div className="login-body-description-title">Log in to Your Account</div>
      <div className="login-body-description-subtitle">
        Please enter your email and password to log in, or use a social account.
      </div>
    </div>
  );
};

interface LoginInputProps {
  placeholder?: string;
  type?: InputProps["type"];
  value: string;
  showPasswordToggle?: boolean;
  onChange: (value: string) => void;
}

const LoginInput: React.FC<LoginInputProps> = ({
  placeholder = "text",
  type = "text",
  value,
  showPasswordToggle = false,
  onChange,
}) => (
  <div className="login-form-input" data-name="login - input">
    <Input
      placeholder={placeholder}
      type={type}
      value={value}
      showPasswordToggle={showPasswordToggle}
      onChange={onChange}
    />
  </div>
);

interface LoginSectionProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onLogin?: (provider: LoginProvider) => Promise<void> | void;
  onSignUp?: () => Promise<void> | void;
  loadingProvider?: LoginProvider | null;
}

const LoginSection: React.FC<LoginSectionProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onLogin,
  onSignUp,
  loadingProvider,
}) => {
  return (
    <div className="login-form-section" data-name="Login In Form Section">
      <div className="login-form-input-section">
        <LoginInput
          placeholder={"Email"}
          type={"email"}
          value={email}
          onChange={onEmailChange}
        />
        <LoginInput
          placeholder={"Password"}
          type={"password"}
          value={password}
          onChange={onPasswordChange}
          showPasswordToggle={true}
        />
      </div>
      <div className="login-form-button-section">
        <Button
          background="#ff5733"
          className="login-form-button"
          onClick={onLogin ? () => onLogin(LoginProvider.EMAIL) : undefined}
          loading={loadingProvider === LoginProvider.EMAIL}
          // disabled={loadingProvider !== null}
        >
          Log In
        </Button>
        <Button
          type="button"
          background="#ff5733"
          className="login-form-button"
          onClick={onSignUp}
          disabled={loadingProvider !== null}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

const Divider = () => {
  return (
    <div className="login-divider-section" data-name="Divider">
      <div className="login-divider-line" />
      <div className="login-divider-text">or continue with</div>
      <div className="login-divider-line" />
    </div>
  );
};

interface SnsButtonSectionProps {
  onSnsLogin?: (provider: SnsProvider) => Promise<void> | void;
  loadingProvider?: LoginProvider | null;
}

const SnsButtonSection: React.FC<SnsButtonSectionProps> = ({
  onSnsLogin,
  loadingProvider,
}) => {
  return (
    <div className="login-sns-button-section" data-name="SNS buttons">
      <SnsLoginButton
        provider={SnsProvider.GOOGLE}
        onLogin={onSnsLogin}
        loading={loadingProvider === LoginProvider.GOOGLE}
        disabled={
          loadingProvider !== null && loadingProvider !== LoginProvider.GOOGLE
        }
        icon={<GoogleIcon width={16} height={16} />}
      >
        Continue with Google
      </SnsLoginButton>

      <SnsLoginButton
        provider={SnsProvider.APPLE}
        onLogin={onSnsLogin}
        loading={loadingProvider === LoginProvider.APPLE}
        disabled={
          loadingProvider !== null && loadingProvider !== LoginProvider.APPLE
        }
        icon={<AppleIcon width={16} height={16} />}
      >
        Continue with Apple
      </SnsLoginButton>
    </div>
  );
};

const RememberMeSection = ({}) => {
  return (
    <div className="login-remember-me-section">
      <Checkbox children={"Remember me"} />
    </div>
  );
};

interface BodyProps {
  onLogin?: (email: string, password: string) => Promise<void> | void;
  onSnsLogin?: (provider: SnsProvider) => Promise<void> | void;
  onSignUp?: () => Promise<void> | void;
  snsSignInFlowType?: SnsSignInFlowType; // 0: 리다이렉트, 1: 팝업
}

const Body: React.FC<BodyProps> = ({
  onLogin,
  onSnsLogin,
  onSignUp,
  snsSignInFlowType,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingProvider, setLoadingProvider] = useState<LoginProvider | null>(
    null
  );

  const handleLogin = async (provider: LoginProvider): Promise<void> => {
    const abortController = new AbortController();

    try {
      setLoadingProvider(provider);

      const loginPromise =
        provider == LoginProvider.EMAIL
          ? Promise.resolve(onLogin?.(email, await sha256(password)))
          : Promise.resolve(onSnsLogin?.(provider));

      const promises = [loginPromise];

      if (snsSignInFlowType === SnsSignInFlowType.REDIRECT) {
        const timeoutPromise = new Promise<void>((_, reject) => {
          setTimeout(() => {
            console.log("Timeout reached, aborting login...");
            abortController.abort(); // 로그인 중단 신호 발송
            reject(new Error("Login timeout"));
          }, 5000);
        });
        promises.push(timeoutPromise);
      }

      await Promise.race(promises);
    } catch (error) {
      console.error("Login failed:", error);
      if (error instanceof Error && error.message === "Login timeout") {
        console.log("Login was cancelled due to timeout");
        abortController.abort(); // 명시적으로 중단
        window.stop(); // 페이지 로딩 중단
      }
    } finally {
      console.log("Login process finished");
      setLoadingProvider(null);
    }
  };

  return (
    <div className="login-body" data-name="Main Content">
      <DescriptionSection />
      <LoginSection
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onLogin={handleLogin}
        onSignUp={onSignUp}
        loadingProvider={loadingProvider}
      />
      <Divider />
      <SnsButtonSection
        onSnsLogin={handleLogin}
        loadingProvider={loadingProvider}
      />
      <RememberMeSection />
    </div>
  );
};
/* Body */

/* Footer */
const Footer = () => {
  return <div className="login-footer" data-name="Basic Footer" />;
};
/* Footer */

export interface LoginFormProps {
  className?: string;
  appName?: string;
  onLogin?: (email: string, password: string) => Promise<void> | void;
  onSnsLogin?: (provider: SnsProvider) => Promise<void> | void;
  onSignUp?: () => Promise<void> | void;
  snsSignInFlowType?: SnsSignInFlowType; // 0: 리다이렉트, 1: 팝업
}

export const LoginForm: React.FC<LoginFormProps> = ({
  className = "",
  appName = "Example",
  onLogin,
  onSnsLogin,
  onSignUp,
  snsSignInFlowType,
}) => {
  return (
    <div className={`login-frame ${className}`} data-name="Frame">
      <Header logoText={appName} />
      <Body
        onLogin={onLogin}
        onSnsLogin={onSnsLogin}
        onSignUp={onSignUp}
        snsSignInFlowType={snsSignInFlowType}
      />
      <Footer />
    </div>
  );
};
