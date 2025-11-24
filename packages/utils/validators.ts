export const isEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^01[0-9]-\d{4}-\d{4}$/;
  return phoneRegex.test(phone);
};

export const isUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validatePassword = (
  password: string,
  t: (key: string) => string
): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  if (password.length < 8) {
    errors.push(t("auth.validation.password_min_length"));
  }

  if (!/[A-Z]/.test(password)) {
    errors.push(t("auth.validation.password_require_uppercase"));
  }

  if (!/[a-z]/.test(password)) {
    errors.push(t("auth.validation.password_require_lowercase"));
  }

  if (!/\d/.test(password)) {
    errors.push(t("auth.validation.password_require_number"));
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
