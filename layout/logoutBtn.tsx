"use client";

import { API } from "@/app/api/lib/clientAPI";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user/userStore";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const userStore = useUserStore();
  const router = useRouter();

  async function handleLogout() {
    userStore.logout();
    await API.postLogout();
    router.replace("/login");
    router.refresh();
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
