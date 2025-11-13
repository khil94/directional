"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>제목</TableHead>
            <TableHead>카테고리</TableHead>
            <TableHead>태그</TableHead>
            <TableHead>생성 시각</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items?.map((v) => {
            return (
              <TableRow key={v.id}>
                <TableCell>{v.title}</TableCell>
                <TableCell>{v.category}</TableCell>
                <TableCell>
                  <div>
                    {v.tags.map((t) => (
                      <span key={`${v.id}-tag-${t}`}>{t}</span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(v.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
