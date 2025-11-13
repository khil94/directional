import { notFound } from "next/navigation";

export async function CommonApi<T>(
  input: string | URL | Request,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error(`API ERROR by common api : ${res.status}`);
  }
  return res.json();
}
