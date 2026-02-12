import React, { useEffect, useRef, useCallback } from "react";
import { Button, Checkbox, Divider, Input } from "@example/ui";
import { SocialButtonSection } from "./social-button-section";
import { SocialProvider, LoginProvider } from "@example/shared";
import { useTranslation } from "@example/i18n";
import { useAuthForm, AuthFormData, AuthFormErrors } from "../../hooks";
import "../../styles/auth/signup-modal.css";

/* Title Section */
const TitleSection = () => {
  const { t } = useTranslation();
  return (
    <div className="signup-title-section" data-name="Title Section">
      <h2 id="signup-modal-title" className="signup-title">
        {t("application_name")}
      </h2>
      <div className="signup-subtitle">{t("signup_subtitle")}</div>
    </div>
  );
};

/* Information Section */
interface InformationSectionProps {
  formData: AuthFormData;
  errors: AuthFormErrors;
  onFormChange: (field: keyof AuthFormData, value: string | boolean) => void;
  onBlur: (field: keyof AuthFormErrors) => void;
  isLoading: boolean;
  isAnyLoading: boolean;
  isFormValid: boolean;
  onSubmit: () => void;
}

const InformationSection: React.FC<InformationSectionProps> = ({
  formData,
  errors,
  onFormChange,
  onBlur,
  isLoading,
  isAnyLoading,
  isFormValid,
  onSubmit,
}) => {
  const { t } = useTranslation();
  return (
    <div className="signup-information-section" data-name="Information Section">
      <div className="signup-information-container">
        <label
          htmlFor="signup-name"
          className="signup-information-container-name"
        >
          {t("name")}
        </label>
        <Input
          id="signup-name"
          placeholder={t("placeholder_name")}
          type="username"
          value={formData.name}
          onChange={(value) => onFormChange("name", value)}
          onBlur={() => onBlur("name")}
          state={errors.name !== null ? "error" : "default"}
          disabled={isLoading}
          errorId="signup-name-error"
        />
        {errors.name && (
          <div id="signup-name-error" className="text-error" role="alert">
            {errors.name}
          </div>
        )}
      </div>
      <div className="signup-information-container">
        <label
          htmlFor="signup-email"
          className="signup-information-container-name"
        >
          {t("email")}
        </label>
        <Input
          id="signup-email"
          placeholder={t("placeholder_email")}
          type="email"
          value={formData.email}
          onChange={(value) => onFormChange("email", value)}
          onBlur={() => onBlur("email")}
          state={errors.email !== null ? "error" : "default"}
          disabled={isLoading}
          errorId="signup-email-error"
        />
        {errors.email && (
          <div id="signup-email-error" className="text-error" role="alert">
            {errors.email}
          </div>
        )}
      </div>
      <div className="signup-information-container">
        <label
          htmlFor="signup-password"
          className="signup-information-container-name"
        >
          {t("password")}
        </label>
        <Input
          id="signup-password"
          placeholder={t("placeholder_password")}
          type="password"
          value={formData.password}
          onChange={(value) => onFormChange("password", value)}
          onBlur={() => onBlur("password")}
          state={errors.password !== null ? "error" : "default"}
          showPasswordToggle
          disabled={isLoading}
          errorId="signup-password-error"
        />
        {errors.password && (
          <div id="signup-password-error" className="text-error" role="alert">
            {errors.password}
          </div>
        )}
      </div>
      <div className="signup-information-container">
        <label
          htmlFor="signup-confirm-password"
          className="signup-information-container-name"
        >
          {t("password")} {t("confirm")}
        </label>
        <Input
          id="signup-confirm-password"
          placeholder={t("placeholder_confirm_password")}
          type="password"
          value={formData.confirmPassword}
          onChange={(value) => onFormChange("confirmPassword", value)}
          onBlur={() => onBlur("confirmPassword")}
          state={errors.confirmPassword !== null ? "error" : "default"}
          showPasswordToggle
          disabled={isLoading}
          errorId="signup-confirm-password-error"
        />
        {errors.confirmPassword && (
          <div
            id="signup-confirm-password-error"
            className="text-error"
            role="alert"
          >
            {errors.confirmPassword}
          </div>
        )}
      </div>
      <Checkbox
        className="signup-agreed-to-terms"
        checked={formData.isAgreedToTerms}
        onChange={(checked) => onFormChange("isAgreedToTerms", checked)}
        disabled={isLoading}
      >
        {/* TODO: Terms of Service 페이지 연결 */}
        <span
          className="text-link"
          role="link"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              /* TODO: Terms of Service 페이지 이동 */
            }
          }}
        >
          {t("signup_terms_of_service")}
        </span>
        {t("signup_and")}
        {/* TODO: Privacy Policy 페이지 연결 */}
        <span
          className="text-link"
          role="link"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              /* TODO: Privacy Policy 페이지 이동 */
            }
          }}
        >
          {t("signup_privacy_policy")}
        </span>
        {t("signup_agree_suffix")}
      </Checkbox>
      <Button
        className="button-primary"
        onClick={onSubmit}
        loading={isLoading}
        disabled={!isFormValid || isAnyLoading}
      >
        {t("signup")}
      </Button>
    </div>
  );
};

/* Signup Modal Content */
interface SignupModalContentProps {
  onSignUp: (email: string, password: string, name: string) => Promise<void>;
  onSocialLogin?: (provider: SocialProvider) => Promise<void> | void;
}

const SignupModalContent: React.FC<SignupModalContentProps> = ({
  onSignUp,
  onSocialLogin,
}) => {
  const { t } = useTranslation();
  const {
    formData,
    errors,
    loadingProvider,
    isFormValid,
    handleChange,
    handleBlur,
    handleEmailSubmit,
    handleSocialSubmit,
  } = useAuthForm({
    mode: "signup",
    onSignUp,
    onSocialLogin,
  });

  return (
    <div className="signup-modal-content" data-name="Signup Content">
      <TitleSection />
      <InformationSection
        formData={formData}
        errors={errors}
        onFormChange={handleChange}
        onBlur={handleBlur}
        isLoading={loadingProvider === LoginProvider.EMAIL}
        isAnyLoading={loadingProvider !== null}
        isFormValid={isFormValid}
        onSubmit={handleEmailSubmit}
      />
      <Divider text={t("login_continue_with")} />
      <SocialButtonSection
        onSocialLogin={handleSocialSubmit}
        loadingProvider={loadingProvider}
      />
    </div>
  );
};

/* Signup Modal */
export interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: (email: string, password: string, name: string) => Promise<void>;
  onSocialLogin?: (provider: SocialProvider) => Promise<void> | void;
}

export const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  onSignUp,
  onSocialLogin,
}) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  /* ESC 키로 모달 닫기 및 포커스 트랩 */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      /* 포커스 트랩: Tab 키로 모달 내에서만 포커스 이동 */
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements =
          modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    },
    [onClose],
  );

  /* 모달 열릴 때 포커스 관리 및 이벤트 리스너 등록 */
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.addEventListener("keydown", handleKeyDown);

      /* 모달 내 첫 번째 포커스 가능한 요소로 포커스 이동 */
      const timer = setTimeout(() => {
        const firstInput =
          modalRef.current?.querySelector<HTMLElement>("input");
        firstInput?.focus();
      }, 0);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        clearTimeout(timer);
        /* 이전 요소가 DOM에 존재하는 경우에만 포커스 복원 */
        if (previousActiveElement.current?.isConnected) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, handleKeyDown]);

  const handleOverlayClick = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="signup-modal-overlay" onClick={handleOverlayClick}>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-modal-title"
        className="signup-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          type="button"
          className="signup-modal-close-button"
          onClick={onClose}
          aria-label={t("close")}
        >
          ×
        </Button>
        <SignupModalContent onSignUp={onSignUp} onSocialLogin={onSocialLogin} />
      </div>
    </div>
  );
};
