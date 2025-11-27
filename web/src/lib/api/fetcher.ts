import { apiClient } from "@/lib/api/client";

// Small helper suitable for SWR/react-query fetchers.
export async function fetcher<T>(path: string): Promise<T> {
  const res = await apiClient.get<T>(path);
  if (!res.ok) {
    const err = new Error(res.error?.message ?? "API error") as any;
    Object.assign(err, res.error ?? {});
    throw err;
  }
  return res.data;
}
