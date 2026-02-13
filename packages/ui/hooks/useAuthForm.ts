import { useState, useMemo } from "react";
import {
  SocialProvider,
  LoginProvider,
  SocialSignInFlowType,
} from "@example/shared";
import {
  sha512,
  validateEmail,
  validatePassword,
  validateUserName,
  validateLoginForm,
} from "@example/utils";
import { useTranslation } from "@example/i18n";

export type AuthMode = "login" | "signup";

export interface AuthFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAgreedToTerms: boolean;
}

export interface AuthFormErrors {
  name: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
}

export interface UseAuthFormOptions {
  mode: AuthMode;
  onLogin?: (email: string, password: string) => Promise<void> | void;
  onSignUp?: (email: string, password: string, name: string) => Promise<void>;
  onSocialLogin?: (provider: SocialProvider) => Promise<void> | void;
  socialSignInFlowType?: SocialSignInFlowType;
}

export type LoadingProvider = LoginProvider.EMAIL | SocialProvider | null;

export interface UseAuthFormReturn {
  // State
  formData: AuthFormData;
  errors: AuthFormErrors;
  loadingProvider: LoadingProvider;
  isFormValid: boolean;
  // Handlers
  handleChange: (field: keyof AuthFormData, value: string | boolean) => void;
  handleBlur: (field: keyof AuthFormErrors) => void;
  handleEmailSubmit: () => Promise<void>;
  handleSocialSubmit: (provider: SocialProvider) => Promise<void>;
  resetForm: () => void;
}

const LOGIN_TIMEOUT_MS = 5000;

const createInitialFormData = (): AuthFormData => ({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  isAgreedToTerms: false,
});

const initialErrors: AuthFormErrors = {
  name: null,
  email: null,
  password: null,
  confirmPassword: null,
};

export const useAuthForm = ({
  mode,
  onLogin,
  onSignUp,
  onSocialLogin,
  socialSignInFlowType,
}: UseAuthFormOptions): UseAuthFormReturn => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<AuthFormData>(
    createInitialFormData(),
  );
  const [errors, setErrors] = useState<AuthFormErrors>(initialErrors);
  const [loadingProvider, setLoadingProvider] = useState<LoadingProvider>(null);

  const handleChange = (field: keyof AuthFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleBlur = (field: keyof AuthFormErrors) => {
    const value = formData[field] as string;
    if (!value) return;

    switch (field) {
      case "name":
        if (mode === "signup") {
          const error = validateUserName(value);
          if (error) {
            setErrors((prev) => ({ ...prev, name: t(error) }));
          }
        }
        break;
      case "email": {
        const error = validateEmail(value);
        if (error) {
          setErrors((prev) => ({ ...prev, email: t(error) }));
        }
        break;
      }
      case "password": {
        const result = validatePassword(value);
        if (!result.isValid) {
          setErrors((prev) => ({ ...prev, password: t(result.errors[0]) }));
        }
        break;
      }
      case "confirmPassword":
        if (mode === "signup" && value !== formData.password) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: t("error_password_mismatch"),
          }));
        }
        break;
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAgreedToTerms: false,
    });
    setErrors(initialErrors);
  };

  /* 폼 유효성 검사 (의존값 변경 시에만 재계산) */
  const isFormValid = useMemo(() => {
    const { email, password, name, confirmPassword, isAgreedToTerms } =
      formData;
    const baseValid = email && password && !errors.email && !errors.password;

    if (mode === "signup") {
      return Boolean(
        baseValid &&
          name &&
          confirmPassword &&
          isAgreedToTerms &&
          !errors.name &&
          !errors.confirmPassword,
      );
    }

    return Boolean(baseValid);
  }, [
    formData.email,
    formData.password,
    formData.name,
    formData.confirmPassword,
    formData.isAgreedToTerms,
    errors.email,
    errors.password,
    errors.name,
    errors.confirmPassword,
    mode,
  ]);

  const handleLoginSubmit = async () => {
    const validation = validateLoginForm(formData.email, formData.password);

    if (!validation.isValid) {
      setErrors((prev) => ({
        ...prev,
        email: validation.emailError ? t(validation.emailError) : null,
        password:
          validation.passwordErrors.length > 0
            ? t(validation.passwordErrors[0])
            : null,
      }));
      return;
    }

    try {
      const hashedPassword = await sha512(formData.password);
      await onLogin?.(formData.email, hashedPassword);
    } catch {
      setErrors((prev) => ({ ...prev, password: t("error_unknown") }));
    }
  };

  const handleSignupSubmit = async () => {
    const { email, password, confirmPassword, name } = formData;

    const emailError = validateEmail(email);
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: t(emailError) }));
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setErrors((prev) => ({
        ...prev,
        password: t(passwordValidation.errors[0]),
      }));
      return;
    }

    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: t("error_password_mismatch"),
      }));
      return;
    }

    try {
      const hashedPassword = await sha512(password);
      await onSignUp?.(email, hashedPassword, name);
      resetForm();
    } catch {
      setErrors((prev) => ({ ...prev, password: t("error_unknown") }));
    }
  };

  const handleEmailSubmit = async (): Promise<void> => {
    try {
      setLoadingProvider(LoginProvider.EMAIL);
      if (mode === "login") {
        await handleLoginSubmit();
      } else {
        await handleSignupSubmit();
      }
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleSocialSubmit = async (
    provider: SocialProvider,
  ): Promise<void> => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let isTimedOut = false;

    try {
      setLoadingProvider(provider);

      const submitPromise = Promise.resolve(onSocialLogin?.(provider));

      /* 리다이렉트 방식일 경우 타임아웃 처리 (페이지 전환 실패 시 로딩 해제) */
      if (socialSignInFlowType === SocialSignInFlowType.REDIRECT) {
        await Promise.race([
          submitPromise,
          new Promise<void>((_, reject) => {
            timeoutId = setTimeout(() => {
              isTimedOut = true;
              reject(new Error("Login timeout"));
            }, LOGIN_TIMEOUT_MS);
          }),
        ]);
      } else {
        await submitPromise;
      }
    } catch (error) {
      if (error instanceof Error && error.message === "Login timeout") {
        /* 타임아웃 시 페이지 로드 중단 (리다이렉트 실패 처리) */
        window.stop();
      }
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      /* 타임아웃으로 인한 종료가 아닌 경우에만 로딩 해제 */
      if (!isTimedOut) {
        setLoadingProvider(null);
      }
    }
  };

  return {
    formData,
    errors,
    loadingProvider,
    isFormValid,
    handleChange,
    handleBlur,
    handleEmailSubmit,
    handleSocialSubmit,
    resetForm,
  };
};
