import { useTranslation as useI18nTranslation } from "react-i18next";
import type { TFunction, i18n } from "i18next";

export interface UseTranslationReturn {
  t: TFunction;
  i18n: i18n;
  changeLanguage: (lng: string) => void;
  currentLanguage: string;
}

/**
 * 다국어 번역 및 언어 변경을 위한 커스텀 Hook
 *
 * react-i18next의 useTranslation을 확장하여 localStorage 저장 기능 추가
 *
 * @returns {Object} 번역 및 언어 관리 함수들
 * @returns {Function} t - 번역 함수 (예: t('auth.login.title'))
 * @returns {Object} i18n - i18next 인스턴스 (고급 기능 접근용)
 * @returns {Function} changeLanguage - 언어 변경 함수 (localStorage에 자동 저장)
 * @returns {string} currentLanguage - 현재 활성화된 언어 코드 (예: 'ko', 'en')
 *
 * @example
 * const { t, changeLanguage, currentLanguage } = useTranslation();
 *
 * // 번역 사용
 * <h1>{t('common.welcome')}</h1>
 *
 * // 언어 변경
 * <button onClick={() => changeLanguage('ko')}>한국어</button>
 * <button onClick={() => changeLanguage('en')}>English</button>
 *
 * // 현재 언어 표시
 * <p>Current: {currentLanguage}</p>
 */
export const useTranslation = (): UseTranslationReturn => {
  // react-i18next의 기본 훅 사용
  const { t, i18n } = useI18nTranslation();

  /**
   * 언어를 변경하고 localStorage에 저장
   *
   * @param {string} lng - 변경할 언어 코드 ('ko', 'en' 등)
   */
  const changeLanguage = (lng: string) => {
    // i18next의 언어 변경 메서드 호출
    i18n.changeLanguage(lng);

    // 사용자가 선택한 언어를 localStorage에 저장
    // 다음 방문 시 i18n.ts의 getBrowserLanguage()에서 이 값을 우선적으로 사용
    /* localStorage 접근 시 오류 처리 (Private browsing 모드 등) */
    try {
      localStorage.setItem("i18n-language", lng);
    } catch {
      /* localStorage 접근 불가 시 무시 (언어는 세션 동안만 유지) */
    }
  };

  return {
    t, // 번역 함수: t('키') -> 번역된 문자열
    i18n, // i18n 인스턴스 (필요시 직접 제어)
    changeLanguage, // 언어 변경 함수
    currentLanguage: i18n.language, // 현재 언어 코드
  };
};
