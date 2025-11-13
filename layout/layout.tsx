import { ReactNode } from "react";
import Header from "./header";
import QueryProvider from "./queryProvider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <div>
        <Header />
        {children}
      </div>
    </QueryProvider>
  );
}
