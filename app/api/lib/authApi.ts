import { cookies } from "next/headers";

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
