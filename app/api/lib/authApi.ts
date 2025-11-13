import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { fetcher } from "./fetcher";

export async function getTokenHeader<T>(): Promise<Record<string, string>> {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  if (!token) {
    throw new Error("인증 필요 (토큰 없음)");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function authFetcher<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const token = (await cookies()).get("token")?.value;

  const res = await fetcher(path, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    console.log(res);
    throw new Error("server fetcher error");
  }

  return res.json();
}
