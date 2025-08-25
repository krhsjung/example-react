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
): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("비밀번호는 8자 이상이어야 합니다.");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("대문자를 포함해야 합니다.");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("소문자를 포함해야 합니다.");
  }

  if (!/\d/.test(password)) {
    errors.push("숫자를 포함해야 합니다.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
