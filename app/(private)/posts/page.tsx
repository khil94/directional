"use client";

import { usePosts } from "@/hooks/usePosts";
import { Cursor, PostsRequest } from "@/types/post";
import { useState } from "react";

export default function PostsPage() {
  const [params, setParams] = useState<PostsRequest>({
    limit: 11,
    search: "",
  });

  const [cursor, setCursor] = useState<Cursor>(undefined);

  const { isLoading, isError, data } = usePosts(params, cursor);

  function goNext(cursor: string) {
    setCursor({
      nextCursor: cursor,
      prevCursor: undefined,
    });
  }

  function goPrev(cursor: string) {
    setCursor({
      prevCursor: cursor,
      nextCursor: undefined,
    });
  }

  function resetCursor() {
    setCursor(undefined);
  }

  function updateFilter(val: Partial<PostsRequest>) {
    setParams((prev) => ({
      ...prev,
      ...val,
      nextCursor: undefined,
      prevCursor: undefined,
    }));
    resetCursor();
  }
  console.log("wtf", data);

  return (
    <div>
      <div>
        {data?.items?.map((v) => {
          return <div key={v.id}>{v.title}</div>;
        })}
      </div>
    </div>
  );
}
