import { apiClient } from "./client";

// Small helper suitable for SWR/react-query fetchers.
export async function fetcher<T>(path: string): Promise<T> {
  const res = await apiClient.get<T>(path);
  if (!res.ok) throw res.error;
  return res.data;
}
