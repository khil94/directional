"use client";

import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/hooks/usePosts";
import { PostsRequest } from "@/types/post";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FilterSection from "./filterSection";
import PostsSection from "./postsSection";

export default function PostsWrapper() {
  const router = useRouter();
  const [params, setParams] = useState<PostsRequest>({
    limit: 10,
    search: "",
  });

  const { isLoading, isFetching, isError, data } = usePosts(params);

  function goNext(cursor: string) {
    setParams((prev) => ({
      ...prev,
      nextCursor: cursor,
      prevCursor: undefined,
    }));
  }

  function goPrev(cursor: string) {
    setParams((prev) => ({
      ...prev,
      prevCursor: cursor,
      nextCursor: undefined,
    }));
  }

  function updateFilter(val: Partial<PostsRequest>) {
    setParams((prev) => ({
      ...prev,
      ...val,
      nextCursor: undefined,
      prevCursor: undefined,
    }));
  }

  function handleSearch(searchVal: string) {
    updateFilter({
      search: searchVal,
    });
  }

  return (
    <div className="overflow-auto">
      <FilterSection
        handleSearch={handleSearch}
        updateFilter={updateFilter}
        category={params.category}
        sort={params.sort}
        order={params.order}
      />

      <section>
        {isLoading ? (
          <Loading />
        ) : isFetching ? (
          <div className="absolute inset-0 bg-white/40 pointer-events-none" />
        ) : (
          <PostsSection
            onClick={(id) => router.push(`/posts/${id}`)}
            data={data!}
          />
        )}
      </section>
      <div className="flex justify-center items-center gap-4 mt-8">
        {/* 3. 페이지네이션 */}
        <Button
          onClick={() => {
            goPrev(data!.prevCursor!);
          }}
          disabled={!data?.prevCursor}
          variant="outline"
        >
          이전
        </Button>
        <Button
          onClick={() => {
            goNext(data!.nextCursor!);
          }}
          disabled={!data?.nextCursor}
          variant="outline"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
