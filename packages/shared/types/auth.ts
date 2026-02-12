export enum SocialProvider {
  GOOGLE = "google",
  APPLE = "apple",
}

export enum LoginProvider {
  EMAIL = "email",
  GOOGLE = "google",
  APPLE = "apple",
}

export type LoginHandler = (
  provider: LoginProvider,
  email?: string,
  password?: string,
) => Promise<void> | void;

// Social 로그인 팝업 타입 0: 리다이렉트, 1: 팝업
export enum SocialSignInFlowType {
  REDIRECT = "redirect",
  POPUP = "popup",
}
