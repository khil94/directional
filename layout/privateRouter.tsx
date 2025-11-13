import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function PrivateRouter({
  children,
  type = "private",
}: {
  children: ReactNode;
  type?: "private" | "non-private";
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  switch (type) {
    case "private":
      if (!token) {
        redirect("/login");
      }
      return <>{children}</>;
    case "non-private":
      if (token) {
        redirect("/board");
      }
      return <>{children}</>;
  }
}
