import React from "react";
import "../../styles/common/divider.css";

export interface DividerProps {
  text?: string;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ text, className = "" }) => {
  /* 텍스트가 없으면 시맨틱 <hr> 사용 */
  if (!text) {
    return (
      <hr className={["divider-line", className].filter(Boolean).join(" ")} />
    );
  }

  /* 텍스트가 있으면 장식용 구분선으로 처리 */
  return (
    <div
      className={["divider-section", className].filter(Boolean).join(" ")}
      role="separator"
      data-name="Divider"
    >
      <hr className="divider-line" aria-hidden="true" />
      <span className="text-secondary">{text}</span>
      <hr className="divider-line" aria-hidden="true" />
    </div>
  );
};
