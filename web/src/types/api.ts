// Common API types and example endpoint shapes. Add endpoint-specific types here
// so the rest of the app can import strongly-typed request/response shapes.

export type LoginRequest = { email: string; password: string };

export type LoginResponse = {
  access_token: string;
  refresh_token?: string;
  user: { id: number; username: string; roles?: string[] };
};

export type RegisterRequest = {};

export type GenericServerError = { message?: string; [key: string]: any };

export type ApiError = { status: number; message: string; details?: any };

export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };
