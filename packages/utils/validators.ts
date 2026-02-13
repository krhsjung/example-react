import { REGEX_PATTERNS } from "./constants";

export type UserNameValidationError = "error_name_min_length";

export const validateUserName = (
  username: string,
): UserNameValidationError | null => {
  if (username.length < 2) {
    return "error_name_min_length";
  }
  return null;
};

export const isEmail = (email: string): boolean => {
  return REGEX_PATTERNS.EMAIL.test(email);
};

export type EmailValidationError = "error_empty_email" | "error_invalid_email";

export const validateEmail = (email: string): EmailValidationError | null => {
  if (!email) {
    return "error_empty_email";
  }
  if (!isEmail(email)) {
    return "error_invalid_email";
  }
  return null;
};

export const isPhoneNumber = (phone: string): boolean => {
  return REGEX_PATTERNS.PHONE_KR.test(phone);
};

export const isUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export type PasswordValidationError =
  | "error_empty_password"
  | "error_weak_password"
  | "error_password_no_uppercase"
  | "error_password_no_lowercase"
  | "error_password_no_number"
  | "error_password_no_special_character";

export interface PasswordValidationResult {
  isValid: boolean;
  errors: PasswordValidationError[];
}

/* 비밀번호 검증 규칙 */
const PASSWORD_RULES: Array<{
  test: (password: string) => boolean;
  error: PasswordValidationError;
}> = [
  { test: (p) => p.length >= 8, error: "error_weak_password" },
  { test: (p) => /[A-Z]/.test(p), error: "error_password_no_uppercase" },
  { test: (p) => /[a-z]/.test(p), error: "error_password_no_lowercase" },
  { test: (p) => /\d/.test(p), error: "error_password_no_number" },
  {
    test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p),
    error: "error_password_no_special_character",
  },
];

export const validatePassword = (
  password: string,
): PasswordValidationResult => {
  if (!password) {
    return { isValid: false, errors: ["error_empty_password"] };
  }

  const errors = PASSWORD_RULES.filter((rule) => !rule.test(password)).map(
    (rule) => rule.error,
  );

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export interface LoginFormValidationResult {
  isValid: boolean;
  emailError: EmailValidationError | null;
  passwordErrors: PasswordValidationError[];
}

export const validateLoginForm = (
  email: string,
  password: string,
): LoginFormValidationResult => {
  const emailError = validateEmail(email);
  const passwordValidation = validatePassword(password);

  return {
    isValid: emailError === null && passwordValidation.isValid,
    emailError,
    passwordErrors: passwordValidation.errors,
  };
};
