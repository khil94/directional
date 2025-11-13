import { cookies } from "next/headers";

export async function isAuth() {
  const cookieStore = await cookies();
  const isAuth = cookieStore.get("token")?.value !== undefined;

  return isAuth;
}
