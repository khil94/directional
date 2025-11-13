import { isAuth } from "@/lib/isAuth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function PrivateRouter({
  children,
  type = "private",
}: {
  children: ReactNode;
  type?: "private" | "non-private";
}) {
  const auth = await isAuth();

  switch (type) {
    case "private":
      if (!auth) {
        redirect("/login");
      }
      return <>{children}</>;
    case "non-private":
      if (auth) {
        redirect("/posts");
      }
      return <>{children}</>;
  }
}
