/**
 * 한국어 번역 통합 파일
 *
 * 페이지/기능별로 분리된 번역 파일들을 하나로 합칩니다.
 */

import common from "./common.json";
import auth from "./auth.json";
import error from "./error.json";
import serverError from "./server_error.json";

/**
 * 한국어 번역 리소스
 *
 * 새로운 페이지 추가 시:
 * 1. {페이지명}.json 파일 생성
 * 2. import 추가
 * 3. 아래 객체에 추가
 *
 * @example
 * import dashboard from './dashboard.json';
 * export default {
 *   common,
 *   auth,
 *   errors,
 *   dashboard, // 새 페이지 추가
 * };
 */
export default {
  ...common, // 공통 문구 (버튼, 라벨 등)
  ...auth, // 인증 관련 (로그인, 회원가입)
  ...error, // 에러 메시지
  ...serverError, // 서버 에러 메시지
};
