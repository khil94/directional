"use client";

import { Button } from "@/components/ui/button";
import { usePostMutation } from "@/hooks/useCreatePost";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EditDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const { remove } = usePostMutation(id);

  async function deleteHandler() {
    const answer = confirm("진짜 삭제함?");
    if (answer) {
      console.log("on delete clicked");
      await remove.mutateAsync();
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
