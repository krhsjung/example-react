import React, { useState } from "react";
import { Button, Checkbox, Input, SnsLoginButton } from "@example/ui";
import { useTranslation } from "@example/i18n";
import "../../styles/signup-popup.css";
import GoogleIcon from "../../icon/google.svg?react";
import AppleIcon from "../../icon/apple.svg?react";
import { SnsProvider } from "@example/shared";
import { isEmail, validatePassword, sha512 } from "@example/utils";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  agreedToTerms: boolean;
}

const Header = ({
  onClose,
  disabled,
}: {
  onClose: () => void;
  disabled: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <div className="signup-popup-header" data-name="Header">
      <button
        type="button"
        className="signup-popup-close-button"
        onClick={onClose}
        disabled={disabled}
        aria-label={t("close")}
      >
        ×
      </button>
    </div>
  );
};

const BodyHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="signup-popup-body-header" data-name="Header">
      <div className="signup-popup-body-header-title">
        <p>{t("signup_title")}</p>
      </div>
      <div className="signup-popup-body-header-subtitle">
        <p>{t("signup_subtitle")}</p>
      </div>
    </div>
  );
};

const DividerLine = () => (
  <div className="signup-popup-divider-line">
    <div className="signup-popup-divider-line-svg">
      <svg
        className="signup-popup-divider-svg"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 143 2"
      >
        <path
          d="M0 1H143"
          stroke="var(--stroke-0, #6E5049)"
          strokeOpacity="0.2"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  </div>
);

const SignupSection: React.FC<{
  formData: FormData;
  onFormChange: (field: keyof FormData, value: string | boolean) => void;
  isLoading: boolean;
  isFormValid: boolean;
  onSubmit: () => void;
}> = ({ formData, onFormChange, isLoading, isFormValid, onSubmit }) => {
  const { t } = useTranslation();
  return (
    <div className="signup-popup-form-section" data-name="Form Section">
      <div className="signup-popup-field">
        <Input
          type="email"
          placeholder={t("placeholder_email_placeholder")}
          value={formData.email}
          onChange={(value) => onFormChange("email", value)}
          disabled={isLoading}
        />
        <Input
          type="password"
          placeholder={t("placeholder_password_placeholder")}
          value={formData.password}
          onChange={(value) => onFormChange("password", value)}
          showPasswordToggle
          disabled={isLoading}
        />
        <Input
          type="password"
          placeholder={t("placeholder_confirm_password_placeholder")}
          value={formData.confirmPassword}
          onChange={(value) => onFormChange("confirmPassword", value)}
          showPasswordToggle
          disabled={isLoading}
        />
        <Input
          type="text"
          placeholder={t("placeholder_name_placeholder")}
          value={formData.name}
          onChange={(value) => onFormChange("name", value)}
          disabled={isLoading}
        />
      </div>

      <div className="signup-popup-checkbox">
        <Checkbox
          checked={formData.agreedToTerms}
          onChange={(value) => onFormChange("agreedToTerms", value)}
        >
          {t("signup_agree_to_terms")}
        </Checkbox>
      </div>
      <Button
        background="#ff5733"
        onClick={onSubmit}
        disabled={isLoading || !isFormValid}
      >
        {t("signup")}
      </Button>
    </div>
  );
};

const Divider = () => {
  const { t } = useTranslation();
  return (
    <div className="signup-popup-divider" data-name="Divider">
      <DividerLine />
      <div className="signup-popup-divider-text">
        <p>{t("signup_continue_with")}</p>
      </div>
      <DividerLine />
    </div>
  );
};

const SnsButtons: React.FC<{
  onSnsLogin?: (provider: SnsProvider) => Promise<void> | void;
  loadingProvider?: SnsProvider | null;
}> = ({ onSnsLogin, loadingProvider }) => {
  const { t } = useTranslation();
  return (
    <div className="signup-popup-sns-buttons" data-name="SNS buttons">
      <SnsLoginButton
        provider={SnsProvider.GOOGLE}
        onLogin={onSnsLogin}
        loading={loadingProvider === SnsProvider.GOOGLE}
        disabled={
          loadingProvider !== null && loadingProvider !== SnsProvider.GOOGLE
        }
        icon={<GoogleIcon width={16} height={16} />}
      >
        {t("oauth_google")}
      </SnsLoginButton>

      <SnsLoginButton
        provider={SnsProvider.APPLE}
        onLogin={onSnsLogin}
        loading={loadingProvider === SnsProvider.APPLE}
        disabled={
          loadingProvider !== null && loadingProvider !== SnsProvider.APPLE
        }
        icon={<AppleIcon width={16} height={16} />}
      >
        {t("oauth_apple")}
      </SnsLoginButton>
    </div>
  );
};

const Body: React.FC<{
  formData: FormData;
  onFormChange: (field: keyof FormData, value: string | boolean) => void;
  onSnsLogin?: (provider: SnsProvider) => Promise<void> | void;
  loadingProvider?: SnsProvider | null;
  isFormValid: boolean;
  onSubmit: () => void;
}> = ({
  formData,
  onFormChange,
  onSnsLogin,
  loadingProvider,
  isFormValid,
  onSubmit,
}) => (
  <div className="signup-popup-main-content" data-name="Body">
    <BodyHeader />
    <SignupSection
      formData={formData}
      onFormChange={onFormChange}
      isLoading={loadingProvider !== null}
      isFormValid={isFormValid}
      onSubmit={onSubmit}
    />
    <Divider />
    <SnsButtons onSnsLogin={onSnsLogin} loadingProvider={loadingProvider} />
  </div>
);

export interface SignupPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: (email: string, password: string, name: string) => Promise<void>;
  onSnsLogin?: (provider: SnsProvider) => Promise<void> | void;
}

export const SignupPopup: React.FC<SignupPopupProps> = ({
  isOpen,
  onClose,
  onSignUp,
  onSnsLogin,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    email: "test@test.com",
    password: "Test2022@!",
    confirmPassword: "Test2022@!",
    name: "tester",
    agreedToTerms: false,
  });
  const [loadingProvider, setLoadingProvider] = useState<SnsProvider | null>(
    null
  );

  const handleFormChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      email: "test@test.com",
      password: "Test2022@!",
      confirmPassword: "Test2022@!",
      name: "tester",
      agreedToTerms: false,
    });
  };

  const isFormValid = () => {
    const { email, password, confirmPassword, name, agreedToTerms } = formData;
    return Boolean(
      email && password && confirmPassword && name && agreedToTerms
    );
  };

  const handleSubmit = async () => {
    const { email, password, confirmPassword, name } = formData;

    if (!isEmail(email)) {
      alert(t("validation_email_invalid"));
      return;
    }

    const passwordValidation = validatePassword(password, t);
    if (!passwordValidation.isValid) {
      alert(passwordValidation.errors.join("\n"));
      return;
    }

    if (password !== confirmPassword) {
      alert(t("validation_passwords_not_match"));
      return;
    }

    try {
      await onSignUp(email, await sha512(password), name);
      resetForm();
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleSnsLogin = async (provider: SnsProvider): Promise<void> => {
    try {
      setLoadingProvider(provider);
      await Promise.resolve(onSnsLogin?.(provider));
    } catch (error) {
      console.error("SNS login failed:", error);
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleClose = () => {
    if (loadingProvider === null) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="signup-popup-overlay" onClick={handleClose}>
      <div className="signup-popup" onClick={(e) => e.stopPropagation()}>
        <Header onClose={handleClose} disabled={loadingProvider !== null} />
        <div className="signup-popup-main-content">
          <div className="signup-popup-container">
            <Body
              formData={formData}
              onFormChange={handleFormChange}
              onSnsLogin={handleSnsLogin}
              loadingProvider={loadingProvider}
              isFormValid={isFormValid()}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
