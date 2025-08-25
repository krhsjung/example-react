export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const createApiClient = (baseUrl: string) => {
  const request = async <T>(
    endpoint: string,
    options: RequestInit = {},
    contentType: string = "application/json"
  ): Promise<T> => {
    const url = `${baseUrl}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": contentType,
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new ApiError(
        `API Error: ${response.statusText}`,
        response.status,
        await response.json().catch(() => null)
      );
    }

    return response.json();
  };

  return {
    get: <T>(endpoint: string) => request<T>(endpoint),
    post: <T>(endpoint: string, data: any) =>
      request<T>(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    put: <T>(endpoint: string, data: any) =>
      request<T>(endpoint, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: <T>(endpoint: string) => request<T>(endpoint, { method: "DELETE" }),
  };
};
