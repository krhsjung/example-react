export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const DEFAULT_TIMEOUT_MS = 30_000;

export const createApiClient = (
  baseUrl: string,
  timeoutMs = DEFAULT_TIMEOUT_MS,
) => {
  async function request<T = void>(
    endpoint: string,
    options?: RequestInit,
    contentType?: string,
  ): Promise<T extends void ? null : T>;
  async function request<T>(
    endpoint: string,
    options: RequestInit = {},
    contentType: string = "application/json",
  ): Promise<T | null> {
    const url = `${baseUrl}${endpoint}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        credentials: "include",
        headers: {
          "Content-Type": contentType,
          ...options.headers,
        },
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const isErrorObject =
          typeof errorData === "object" && errorData !== null;
        /* 서버 응답: { message: { id: "error_xxx", message: "..." } } 또는 { message: "JSON string" } */
        let errorMessage = isErrorObject ? errorData.message : undefined;

        /* message가 JSON 문자열인 경우 파싱 */
        if (typeof errorMessage === "string") {
          try {
            errorMessage = JSON.parse(errorMessage);
          } catch {
            /* 파싱 실패 시 원본 유지 */
          }
        }

        throw new ApiError(
          response.statusText,
          response.status,
          errorMessage as Record<string, unknown> | undefined,
        );
      }

      const text = await response.text();
      if (!text) {
        return null;
      }
      try {
        return JSON.parse(text);
      } catch {
        /* JSON 파싱 실패 시 ApiError 발생 */
        throw new ApiError("Invalid JSON response", response.status);
      }
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new ApiError("Request timeout", 408);
      }
      throw error;
    }
  }

  return {
    /* GET 요청: data가 있으면 query string으로 변환 */
    get: <T = void, D = Record<string, unknown>>(
      endpoint: string,
      data?: D,
    ) => {
      if (data) {
        const params = new URLSearchParams(
          Object.entries(data).map(([key, value]) => [key, String(value)]),
        );
        return request<T>(`${endpoint}?${params.toString()}`);
      }
      return request<T>(endpoint);
    },
    post: <T = void, D = Record<string, unknown>>(endpoint: string, data?: D) =>
      request<T>(endpoint, {
        method: "POST",
        ...(data && { body: JSON.stringify(data) }),
      }),
    put: <T = void, D = Record<string, unknown>>(endpoint: string, data?: D) =>
      request<T>(endpoint, {
        method: "PUT",
        ...(data && { body: JSON.stringify(data) }),
      }),
    delete: <T = void>(endpoint: string) =>
      request<T>(endpoint, { method: "DELETE" }),
  };
};
