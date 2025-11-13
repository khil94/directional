"use client";

import { deletePost } from "@/app/api/lib/serverAPI";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EditDeleteButton({ id }: { id: string }) {
  const router = useRouter();

  async function deleteHandler() {
    const answer = confirm("진짜 삭제함?");
    if (answer) {
      console.log("on delete clicked");
      await deletePost(id);
      router.replace("/posts");
    }
  }

  return (
    <div className="mt-10 flex justify-end gap-x-4">
      <Button variant="outline">
        <Link href={`/posts/${id}/edit`}>수정</Link>
      </Button>
      <Button
        onClick={async () => {
          await deleteHandler();
        }}
        variant="destructive"
      >
        삭제
      </Button>
    </div>
  );
}
