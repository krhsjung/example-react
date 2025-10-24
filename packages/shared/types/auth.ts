export enum SnsProvider {
  GOOGLE = "google",
  APPLE = "apple",
}

export const LoginProvider = {
  EMAIL: "email",
  ...SnsProvider,
} as const;

export type LoginProvider = (typeof LoginProvider)[keyof typeof LoginProvider];

export type LoginHandler = (
  provider: LoginProvider,
  email?: string,
  password?: string
) => Promise<void> | void;

// SNS 로그인 팝업 타입 0: 리다이렉트, 1: 팝업
export enum SnsSignInFlowType {
  REDIRECT = "redirect",
  POPUP = "popup",
}
