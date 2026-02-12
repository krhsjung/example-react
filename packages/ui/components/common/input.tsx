import React, { HTMLInputTypeAttribute, useState } from "react";
import { useTranslation } from "@example/i18n";
import "../../styles/common/input.css";

/* Email Icon - 이메일 타입 입력 필드에 표시되는 봉투 아이콘 */
const EmailIcon = () => (
  <svg
    className="input-type-icon"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <g clipPath="url(#clip-email)">
      <path
        d="M16.6653 3.33305H3.33306C2.41266 3.33305 1.66653 4.07917 1.66653 4.99957V14.9987C1.66653 15.9191 2.41266 16.6652 3.33306 16.6652H16.6653C17.5857 16.6652 18.3318 15.9191 18.3318 14.9987V4.99957C18.3318 4.07917 17.5857 3.33305 16.6653 3.33305Z"
        stroke="currentColor"
        strokeWidth="1.66652"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3318 5.83283L10.8574 10.5824C10.6002 10.7436 10.3027 10.8291 9.99916 10.8291C9.69559 10.8291 9.39815 10.7436 9.1409 10.5824L1.66653 5.83283"
        stroke="currentColor"
        strokeWidth="1.66652"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip-email">
        <rect width="19.9983" height="19.9983" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

/* Password Icon - 비밀번호 타입 입력 필드에 표시되는 자물쇠 아이콘 */
const PasswordIcon = () => (
  <svg
    className="input-type-icon"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <g clipPath="url(#clip-password)">
      <path
        d="M15.832 9.16589H4.16631C3.24591 9.16589 2.49979 9.91201 2.49979 10.8324V16.6652C2.49979 17.5856 3.24591 18.3318 4.16631 18.3318H15.832C16.7524 18.3318 17.4985 17.5856 17.4985 16.6652V10.8324C17.4985 9.91201 16.7524 9.16589 15.832 9.16589Z"
        stroke="currentColor"
        strokeWidth="1.66652"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83282 9.16588V5.83283C5.83282 4.72786 6.27177 3.66814 7.05311 2.88681C7.83444 2.10547 8.89416 1.66652 9.99914 1.66652C11.1041 1.66652 12.1638 2.10547 12.9452 2.88681C13.7265 3.66814 14.1654 4.72786 14.1654 5.83283V9.16588"
        stroke="currentColor"
        strokeWidth="1.66652"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip-password">
        <rect width="19.9983" height="19.9983" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

/* User Icon - 사용자명 타입 입력 필드에 표시되는 사람 아이콘 */
const UserIcon = () => (
  <svg
    className="input-type-icon"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M15.832 17.4985V15.832C15.832 14.948 15.4808 14.1002 14.8558 13.4752C14.2307 12.8501 13.3829 12.4989 12.4989 12.4989H7.49937C6.61539 12.4989 5.76762 12.8501 5.14255 13.4752C4.51748 14.1002 4.16632 14.948 4.16632 15.832V17.4985"
      stroke="currentColor"
      strokeWidth="1.66652"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.99916 9.16588C11.8399 9.16588 13.3322 7.67363 13.3322 5.83284C13.3322 3.99204 11.8399 2.49979 9.99916 2.49979C8.15836 2.49979 6.66611 3.99204 6.66611 5.83284C6.66611 7.67363 8.15836 9.16588 9.99916 9.16588Z"
      stroke="currentColor"
      strokeWidth="1.66652"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* Eye Icon - 비밀번호 표시 상태 아이콘 (눈 모양) */
const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clipPath="url(#clip-eye)">
      <path
        d="M1.71816 10.2891C1.64872 10.102 1.64872 9.89625 1.71816 9.70917C2.39452 8.06919 3.5426 6.66696 5.01685 5.68026C6.49111 4.69356 8.22514 4.16682 9.99912 4.16682C11.7731 4.16682 13.5071 4.69356 14.9814 5.68026C16.4556 6.66696 17.6037 8.06919 18.2801 9.70917C18.3495 9.89625 18.3495 10.102 18.2801 10.2891C17.6037 11.9291 16.4556 13.3313 14.9814 14.318C13.5071 15.3047 11.7731 15.8315 9.99912 15.8315C8.22514 15.8315 6.49111 15.3047 5.01685 14.318C3.5426 13.3313 2.39452 11.9291 1.71816 10.2891Z"
        stroke="currentColor"
        strokeWidth="1.66652"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99918 12.4989C11.3798 12.4989 12.499 11.3797 12.499 9.99915C12.499 8.61855 11.3798 7.49936 9.99918 7.49936C8.61858 7.49936 7.49939 8.61855 7.49939 9.99915C7.49939 11.3797 8.61858 12.4989 9.99918 12.4989Z"
        stroke="currentColor"
        strokeWidth="1.66652"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip-eye">
        <rect width="19.9983" height="19.9983" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

/* Eye Off Icon - 비밀번호 숨김 상태 아이콘 (가려진 눈 모양) */
const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clipPath="url(#clip-eye-off)">
      <path
        d="M8.94342 4.22964C10.8844 3.99833 12.8478 4.40864 14.5337 5.39791C16.2196 6.38719 17.5354 7.90106 18.2801 9.70834C18.3496 9.89542 18.3496 10.1012 18.2801 10.2883C17.9739 11.0307 17.5692 11.7286 17.0769 12.3631"
        stroke="currentColor"
        strokeWidth="1.66652"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7357 11.7973C11.2642 12.2527 10.6328 12.5046 9.97733 12.4989C9.3219 12.4933 8.69492 12.2304 8.23144 11.7669C7.76796 11.3034 7.50506 10.6764 7.49936 10.021C7.49367 9.36554 7.74563 8.73409 8.20099 8.26263"
        stroke="currentColor"
        strokeWidth="1.66652"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5646 14.5813C13.4592 15.236 12.226 15.6453 10.9485 15.7815C9.67103 15.9176 8.37922 15.7774 7.16072 15.3703C5.94222 14.9631 4.82556 14.2987 3.88648 13.422C2.94741 12.5453 2.20791 11.4768 1.71816 10.2891C1.64872 10.102 1.64872 9.89625 1.71816 9.70917C2.45696 7.91754 3.75688 6.41383 5.42284 5.42371"
        stroke="currentColor"
        strokeWidth="1.66652"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.6665 1.66652L18.3317 18.3318"
        stroke="currentColor"
        strokeWidth="1.66652"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip-eye-off">
        <rect width="19.9983" height="19.9983" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

/* 커스텀 입력 타입 (아이콘 표시용) */
type CustomInputType = "username";

/* 아이콘이 지원되는 입력 타입 */
type IconSupportedType = "email" | "password" | "username";

/* 입력 타입별 아이콘 컴포넌트 매핑 */
const typeIcons: Record<IconSupportedType, React.FC> = {
  email: EmailIcon,
  password: PasswordIcon,
  username: UserIcon,
};

/* 아이콘 지원 타입인지 확인 */
const hasIcon = (type: string): type is IconSupportedType => type in typeIcons;

export interface InputProps {
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  type?: HTMLInputTypeAttribute | CustomInputType;
  disabled?: boolean;
  className?: string;
  state?: "default" | "error" | "success";
  /**
   * 비밀번호 표시/숨김 토글 버튼 표시 여부
   * type="password"일 때만 동작하며, 기본값은 false
   * @example <Input type="password" showPasswordToggle />
   */
  showPasswordToggle?: boolean;
  /** 에러 메시지 요소의 id (aria-describedby 연결용) */
  errorId?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  placeholder = "text",
  value = "",
  onChange,
  onBlur,
  type = "text",
  disabled = false,
  className = "",
  state = "default",
  showPasswordToggle = false,
  errorId,
}) => {
  const { t } = useTranslation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const shouldShowToggle = showPasswordToggle && type === "password";

  /* 커스텀 타입(username)은 실제 input에서는 text로 변환 */
  const getHtmlInputType = () => {
    if (shouldShowToggle && isPasswordVisible) return "text";
    if (type === "username") return "text";
    return type;
  };
  const inputType = getHtmlInputType();

  /* 입력 타입에 해당하는 아이콘 컴포넌트 반환 */
  const TypeIcon = hasIcon(type) ? typeIcons[type] : null;

  const containerClasses = [
    "input-container",
    state !== "default" ? state : "",
    disabled ? "disabled" : "",
    shouldShowToggle ? "with-toggle" : "",
    shouldShowToggle && isPasswordVisible ? "password-visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <div className="input-wrapper">
        <div className="input-inner">
          {TypeIcon && (
            <span aria-hidden="true">
              <TypeIcon />
            </span>
          )}
          <input
            id={id}
            type={inputType}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            placeholder={placeholder}
            className="input-field"
            aria-invalid={state === "error"}
            aria-describedby={
              state === "error" && errorId ? errorId : undefined
            }
          />
          {shouldShowToggle && (
            <button
              type="button"
              className="input-password-toggle"
              onClick={togglePasswordVisibility}
              disabled={disabled}
              aria-label={
                isPasswordVisible ? t("hide_password") : t("show_password")
              }
            >
              <span aria-hidden="true">
                {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
