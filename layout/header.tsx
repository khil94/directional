import { isAuth } from "@/lib/isAuth";
import { ChartArea, Notebook } from "lucide-react";
import Link from "next/link";
import { default as LogoutBtn } from "./AuthBtn";

export default async function Header() {
  const auth = await isAuth();
  return (
    <header className="h-20 border-b-2 border-border content-center">
      <nav className="pr-10">
        <ul className="flex flex-row gap-8 justify-end items-center">
          <li className="">
            <Link href={"/charts"} className="flex flex-row items-center">
              <ChartArea /> 차트
            </Link>
          </li>
          <li>
            <Link href={"/posts"} className="flex flex-row items-center">
              <Notebook /> 게시판
            </Link>
          </li>
          <li className="">
            <LogoutBtn auth={auth} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
