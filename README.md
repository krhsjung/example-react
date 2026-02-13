# Example React

React 기반 모노레포 프로젝트로, 인증 시스템과 다국어 지원을 갖춘 웹 애플리케이션입니다.

## 기술 스택

- **Frontend:** React 19, TypeScript 5.9
- **Build:** Vite 7, Turbo
- **Package Manager:** pnpm
- **i18n:** i18next, react-i18next
- **Linting:** ESLint, Prettier

## 프로젝트 구조

```
example-react/
├── apps/
│   └── web/                    # 메인 웹 애플리케이션
├── packages/
│   ├── config-eslint/          # 공유 ESLint 설정
│   ├── config-typescript/      # 공유 TypeScript 설정
│   ├── i18n/                   # 다국어 지원 (한국어, 영어)
│   ├── shared/                 # 공유 타입, 상수, 설정
│   ├── ui/                     # UI 컴포넌트 라이브러리
│   └── utils/                  # 유틸리티 함수
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## 시작하기

### 요구사항

- Node.js >= 18
- pnpm >= 10.18.3

### 설치

```bash
pnpm install
```

### 환경변수 설정

`apps/web/.env.development` 파일 생성:

```env
VITE_API_ORIGIN=https://your-api-domain.com
VITE_ENV=development
VITE_APP_NAME=Example React
```

### 개발 서버 실행

```bash
# localhost 모드
pnpm local

# development 모드
pnpm development
```

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `pnpm local` | localhost 모드로 개발 서버 실행 |
| `pnpm development` | development 모드로 개발 서버 실행 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm build:dev` | development 모드 빌드 |
| `pnpm deploy:dev` | development 빌드 후 로컬 서버에 배포 |
| `pnpm lint` | ESLint 검사 |
| `pnpm format` | Prettier 포맷팅 |

## 주요 기능

### 인증 시스템

- 이메일/비밀번호 로그인
- OAuth 로그인 (Google, Apple)
- 팝업/리다이렉트 방식 지원
- 세션 기반 인증

### 다국어 지원

- 한국어 (ko)
- 영어 (en)
- 브라우저 언어 자동 감지

### UI 컴포넌트

- Button, Input, Checkbox
- LoginForm, SignupModal
- SocialLoginButton
- ThemeToggle (다크 모드)

## 패키지 설명

### @example/shared

공유 타입과 설정을 제공합니다.

```typescript
import { UserDto, LoginProvider, SocialSignInFlowType } from "@example/shared";
```

### @example/i18n

다국어 지원을 위한 훅을 제공합니다.

```typescript
import { useTranslation } from "@example/i18n";

const { t } = useTranslation();
t("login_title"); // "계정에 로그인하기" (ko) / "Log in to Your Account" (en)
```

### @example/ui

재사용 가능한 UI 컴포넌트를 제공합니다.

```typescript
import { Button, Input, LoginForm } from "@example/ui";
```

### @example/utils

유틸리티 함수를 제공합니다.

```typescript
import { createApiClient, ApiError } from "@example/utils/api";
import { isEmail, validatePassword } from "@example/utils/validators";
```

## API 구조

```
{VITE_API_ORIGIN}/example/nestjs/{VITE_ENV}/api/
├── /auth
│   ├── POST /login        # 로그인
│   ├── POST /logout       # 로그아웃
│   ├── POST /register     # 회원가입
│   ├── GET  /me           # 현재 사용자 정보
│   ├── GET  /google       # Google OAuth
│   └── GET  /apple        # Apple OAuth
└── /user
    └── ...
```

## 라이선스

Private
