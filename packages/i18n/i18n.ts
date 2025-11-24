/**
 * i18next 다국어 설정 파일
 *
 * 애플리케이션의 다국어(i18n) 기능을 초기화하고 설정합니다.
 * 브라우저 언어 자동 감지, localStorage 저장, React 통합 등의 기능을 제공합니다.
 *
 * @module i18n
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en";
import ko from "./locales/ko";

/**
 * 지원하는 언어별 번역 리소스 정의
 *
 * 페이지별로 분리된 번역 파일들이 locales/{언어}/index.ts에서 통합되어 import됩니다.
 *
 * 새로운 언어를 추가하려면:
 * 1. locales/{언어코드}/ 폴더 생성
 * 2. 각 페이지별 .json 파일 생성 (common.json, auth.json 등)
 * 3. locales/{언어코드}/index.ts 파일 생성하여 통합
 * 4. 여기에 import 및 resources에 추가
 *
 * @example
 * import ja from "./locales/ja";
 * const resources = {
 *   en,
 *   ko,
 *   ja, // 일본어 추가
 * };
 */
const resources = {
  en: {
    translation: en, // 영어 번역 (common, auth, errors 등 포함)
  },
  ko: {
    translation: ko, // 한국어 번역 (common, auth, errors 등 포함)
  },
};

/**
 * i18next 라이브러리 초기화 및 설정
 *
 * 플러그인 체인:
 * 1. LanguageDetector: 브라우저 언어 자동 감지
 * 2. initReactI18next: React 컴포넌트와 통합
 */
i18n
  // 브라우저 언어 감지 플러그인 추가
  // localStorage와 navigator.language를 자동으로 체크
  .use(LanguageDetector)
  // React와 i18next를 통합하는 플러그인
  // useTranslation hook을 사용할 수 있게 함
  .use(initReactI18next)
  // i18next 초기 설정
  .init({
    // 번역 리소스 등록
    resources,
    // 지원하지 않는 언어일 때 사용할 기본 언어
    fallbackLng: "en",
    /**
     * 언어 감지 설정
     */
    detection: {
      /**
       * 언어 감지 우선순위
       * 1. localStorage: 사용자가 이전에 선택한 언어 (최우선)
       * 2. navigator: 브라우저/OS 언어 설정
       */
      order: ["localStorage", "navigator"],
      /**
       * 감지된 언어를 저장할 위치
       * localStorage에 'i18nextLng' 키로 저장됨
       */
      caches: ["localStorage"],
    },
    /**
     * 문자열 보간(interpolation) 설정
     */
    interpolation: {
      /**
       * XSS 공격 방지를 위한 HTML 이스케이프
       * React는 자체적으로 XSS 방지를 하므로 false로 설정
       */
      escapeValue: false,
    },
  });

/**
 * 설정이 완료된 i18n 인스턴스 내보내기
 *
 * @example
 * // main.tsx에서 side-effect import
 * import '@example/i18n';
 *
 * // 또는 직접 사용
 * import i18n from '@example/i18n';
 * i18n.changeLanguage('ko');
 */
export default i18n;
