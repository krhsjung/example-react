/// <reference types="vite/client" />

/**
 * 브라우저 환경에서 사용하는 환경설정
 * Vite 환경변수를 기반으로 한 설정
 */
export const createEnvConfig = () => {
  // 브라우저에서만 사용 가능
  if (typeof window === "undefined") {
    throw new Error("createEnvConfig can only be used in browser environment");
  }

  const env = {
    API_ORIGIN: import.meta.env.VITE_API_ORIGIN,
    APP_NAME: import.meta.env.VITE_APP_NAME,
    ENV: import.meta.env.VITE_ENV,
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
  } as const;

  const apiConfig = {
    baseURL: `${env.API_ORIGIN}/example/nestjs/${env.ENV}/api`,
    userAPI: `${env.API_ORIGIN}/example/nestjs/${env.ENV}/api/user`,
    authAPI: `${env.API_ORIGIN}/example/nestjs/${env.ENV}/api/auth`,
  } as const;

  const appConfig = {
    name: env.APP_NAME,
    version: "1.0.0",
    redirectUri: window.location.origin,
  } as const;

  return {
    env,
    apiConfig,
    appConfig,
  };
};

// 타입 정의
export type EnvConfig = ReturnType<typeof createEnvConfig>;
export type Env = EnvConfig["env"];
export type ApiConfig = EnvConfig["apiConfig"];
export type AppConfig = EnvConfig["appConfig"];
