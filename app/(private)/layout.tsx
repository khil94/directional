import PrivateRouter from "@/layout/privateRouter";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <PrivateRouter type="private">{children}</PrivateRouter>;
}
