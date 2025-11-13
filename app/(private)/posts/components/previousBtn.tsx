"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PreviousButton({ target }: { target?: string }) {
  const router = useRouter();
  function handleClick() {
    if (target) {
      router.push(target);
    } else {
      router.back();
    }
  }

  return (
    <Button onClick={handleClick}>
      <ChevronLeftIcon />
    </Button>
  );
}
