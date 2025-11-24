export type ApiError = { status: number; message: string; details?: any };

export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };

export class ApiClient {
  baseUrl: string;
  defaultHeaders: Record<string, string> = {};

  constructor(baseUrl = "") {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  setAuthToken(token?: string) {
    if (token) this.defaultHeaders["Authorization"] = `Bearer ${token}`;
    else delete this.defaultHeaders["Authorization"];
  }

  private buildUrl(path: string) {
    if (/^https?:\/\//.test(path)) return path;
    return `${this.baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
  }

  async request<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
    const headers = {
      ...(init?.headers as Record<string, string>),
      ...this.defaultHeaders,
    };
    const res = await fetch(this.buildUrl(path), { ...init, headers });
    const text = await res.text();
    let json: any = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch (e) {
      json = text;
    }

    if (res.ok) return { ok: true, data: json as T };
    return {
      ok: false,
      error: {
        status: res.status,
        message: (json && json.message) || res.statusText,
        details: json,
      },
    };
  }

  get<T>(path: string) {
    return this.request<T>(path, { method: "GET" });
  }

  post<T, B = unknown>(path: string, body?: B) {
    return this.request<T>(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  put<T, B = unknown>(path: string, body?: B) {
    return this.request<T>(path, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(path: string) {
    return this.request<T>(path, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient(
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5822"
);
