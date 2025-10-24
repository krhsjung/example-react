import { createEnvConfig } from "@example/shared";

/**
 * 앱 환경설정 (타입 패키지에서 가져옴)
 */
const config = createEnvConfig();

export const { env, apiConfig, appConfig } = config;
