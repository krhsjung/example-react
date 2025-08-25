// API 관련 상수
export const API_ENDPOINTS = {
  USERS: "/api/users",
  AUTH: "/api/auth",
} as const;

// 페이지네이션 관련 상수
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// 사용자 역할 관련 상수
export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;

// 상태 관련 상수
export const LOADING_STATES = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;

// HTTP 상태 코드
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_PREFERENCES: "user_preferences",
  THEME: "theme_preference",
} as const;

// 테마 관련 상수
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

// 정규표현식 패턴
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_KR: /^01[0-9]-\d{4}-\d{4}$/,
  PASSWORD_STRONG:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
} as const;

// 환경 변수 기본값
export const ENV_DEFAULTS = {
  NODE_ENV: "local",
  API_BASE_URL: "http://localhost:3000/api",
  APP_NAME: "Next.js Monorepo",
  APP_VERSION: "1.0.0",
} as const;

// 날짜/시간 형식
export const DATE_FORMATS = {
  SHORT: "YYYY-MM-DD",
  LONG: "YYYY년 MM월 DD일",
  WITH_TIME: "YYYY-MM-DD HH:mm:ss",
  TIME_ONLY: "HH:mm",
} as const;

// 에러 메시지
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: "필수 입력 항목입니다.",
  INVALID_EMAIL: "올바른 이메일 주소를 입력해주세요.",
  INVALID_PHONE: "올바른 전화번호를 입력해주세요.",
  WEAK_PASSWORD:
    "비밀번호는 8자 이상이며 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
  NETWORK_ERROR: "네트워크 오류가 발생했습니다.",
  UNKNOWN_ERROR: "알 수 없는 오류가 발생했습니다.",
} as const;

// 성공 메시지
export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: "성공적으로 저장되었습니다.",
  DELETE_SUCCESS: "성공적으로 삭제되었습니다.",
  UPDATE_SUCCESS: "성공적으로 수정되었습니다.",
  LOGIN_SUCCESS: "로그인되었습니다.",
  LOGOUT_SUCCESS: "로그아웃되었습니다.",
  REGISTER_SUCCESS: "회원가입이 완료되었습니다.",
} as const;
