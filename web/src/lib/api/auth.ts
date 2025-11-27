import { LoginRequest, LoginResponse, ApiResponse } from "@/types/api";
import { apiClient } from "@/lib/api/client";

export async function login(
  creds: LoginRequest
): Promise<ApiResponse<LoginResponse>> {
  return apiClient.post<LoginResponse, LoginRequest>("/api/login", creds);
}

export function getStoredAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function setStoredAccessToken(token?: string) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem("access_token", token);
  else localStorage.removeItem("access_token");
  apiClient.setAuthToken(token || undefined);
}
