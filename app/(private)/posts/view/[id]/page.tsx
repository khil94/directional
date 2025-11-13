"use client";

import { Button } from "@/components/ui/button";
import { usePostDetail } from "@/hooks/usePostsDetail";
import { useUserStore } from "@/store/user/userStore";
import { useParams } from "next/navigation";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = usePostDetail(id);
  const { user } = useUserStore();

  return (
    <div className="bg-white py-12 sm:py-16">
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="text-base font-semibold leading-7 text-blue-600">
              {data.category}
            </div>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {data.title}
            </h1>
            <div className="mt-6 flex items-center gap-x-6 border-b border-gray-900/5 pb-6">
              <div className="text-sm leading-6 text-gray-600">
                <span>{new Date(data.createdAt).toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-10 prose prose-lg prose-slate max-w-none">
              <p>{data.body}</p>
            </div>
            <div className="mt-10 border-t border-gray-900/5 pt-6">
              <div className="flex items-center gap-x-4">
                <span className="text-sm font-medium leading-6 text-gray-900">
                  Tags
                </span>
                {data.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {user?.id === data?.userId && (
              <div className="mt-10 flex justify-end gap-x-4">
                <Button variant="outline">수정</Button>
                <Button variant="destructive">삭제</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
