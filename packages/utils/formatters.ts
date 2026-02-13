/**
 * 날짜를 로케일에 맞게 포맷팅
 * @param date - 포맷팅할 날짜
 * @param locale - 로케일 (기본값: 브라우저 설정)
 */
export const formatDate = (date: Date, locale?: string): string => {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * 통화를 로케일에 맞게 포맷팅
 * @param amount - 포맷팅할 금액
 * @param currency - 통화 코드 (기본값: KRW)
 * @param locale - 로케일 (기본값: 브라우저 설정)
 */
export const formatCurrency = (
  amount: number,
  currency = "KRW",
  locale?: string,
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};

/**
 * 숫자를 로케일에 맞게 포맷팅
 * @param num - 포맷팅할 숫자
 * @param locale - 로케일 (기본값: 브라우저 설정)
 */
export const formatNumber = (num: number, locale?: string): string => {
  return new Intl.NumberFormat(locale).format(num);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};
