import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export async function AuthApi<T>(
  input: string | URL | Request,
  init?: RequestInit
): Promise<T> {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  if (!token) {
    throw new Error("인증 필요 (토큰 없음)");
  }
  const res = await fetch(input, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error(`API ERROR by common api : ${res.status}`);
  }

  return res.json();
}
