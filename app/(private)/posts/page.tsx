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
import {
  CATEGORY_LIST,
  ORDER_LIST,
  PostsRequest,
  SORTING_TYPE_LIST,
} from "@/types/post";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { orderTypeRecord, sortTypeRecord } from "@/lib/typeRecord";
import { ChevronDown, PlusCircle, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PostsPage() {
  const router = useRouter();
  const [params, setParams] = useState<PostsRequest>({
    limit: 10,
    search: "",
  });

  const [searchVal, setSearchVal] = useState("");

  const { isLoading, isError, data } = usePosts(params);

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

  // function resetCursor() {
  //   setCursor(undefined);
  // }

  function updateFilter(val: Partial<PostsRequest>) {
    setParams((prev) => ({
      ...prev,
      ...val,
      nextCursor: undefined,
      prevCursor: undefined,
    }));
    // resetCursor();
  }

  function handleSearch() {
    updateFilter({
      search: searchVal,
    });
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <h1 className="text-3xl font-bold">게시글 목록</h1>
          {/* 4. 게시글 작성 버튼 */}
          <Button onClick={() => router.push("/posts/write")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            게시글 작성
          </Button>
        </div>
        <div className="p-4 border rounded-lg flex flex-col gap-4">
          {/* 5. 검색창 검색 버튼 */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="검색어를 입력하세요..."
              className="flex-grow"
            />
            <Button type="submit" onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 p-4">
          {/* 2. 필터(카테고리별 필터링) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 justify-between">
                {params.category ?? "카테고리"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {CATEGORY_LIST.map((v) => {
                return (
                  <DropdownMenuItem
                    onClick={() => {
                      updateFilter({ category: v });
                    }}
                    key={v}
                  >
                    {v}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 1. 정렬 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 justify-between">
                {params.sort && params.order
                  ? `${sortTypeRecord[params.sort]} (${
                      orderTypeRecord[params.order]
                    })`
                  : "정렬"}{" "}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {SORTING_TYPE_LIST.map((v) => {
                return ORDER_LIST.map((t) => {
                  return (
                    <DropdownMenuItem
                      onClick={() => {
                        updateFilter({
                          sort: v,
                          order: t,
                        });
                      }}
                      key={`sorting-${v}-${t}`}
                    >{`${sortTypeRecord[v]} (${orderTypeRecord[t]})`}</DropdownMenuItem>
                  );
                });
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>제목</TableHead>
            <TableHead>카테고리</TableHead>
            <TableHead className="bg-blue-100 p-0">
              <button className="bg-red-300 w-full h-full">태그</button>
            </TableHead>
            <TableHead>생성 시각</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items?.map((v) => {
            return (
              <TableRow
                key={v.id}
                onClick={() => router.push(`/posts/${v.id}`)}
              >
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
