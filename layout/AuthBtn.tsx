"use client";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user/userStore";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface props {
  auth: boolean;
}

export default function AuthBtn({ auth }: props) {
  const userStore = useUserStore();
  const router = useRouter();

  async function handleLogout() {
    await userStore.logout();
    router.replace("/login");
    router.refresh();
  }

  if (!auth || !userStore.user) {
    return (
      <Link href={"/posts"} className="flex flex-row items-center">
        <User /> 로그인
      </Link>
    );
  }

  return (
    <Button
      onClick={async () => {
        await handleLogout();
      }}
      className="flex flex-row items-center"
    >
      <LogOut /> 로그아웃
    </Button>
  );
}
