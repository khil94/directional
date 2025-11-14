"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { orderTypeRecord, sortTypeRecord } from "@/lib/typeRecord";
import {
  Category,
  CATEGORY_LIST,
  Order,
  ORDER_LIST,
  PostsRequest,
  SORTING_TYPE_LIST,
  SortingType,
} from "@/types/post";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

interface props {
  handleSearch: (v: string) => void;
  updateFilter: (val: Partial<PostsRequest>) => void;
  category?: Category;
  sort?: SortingType;
  order?: Order;
}

export default function FilterSection({
  handleSearch,
  updateFilter,
  category,
  sort,
  order,
}: props) {
  const [searchVal, setSearchVal] = useState("");

  return (
    <>
      <div className="p-4 border rounded-lg flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="검색어를 입력하세요..."
            className=""
          />
          <Button
            type="submit"
            onClick={() => {
              handleSearch(searchVal);
            }}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex-1 justify-between">
              {category ?? "카테고리"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-9999">
            <DropdownMenuItem
              className=""
              onClick={() => {
                updateFilter({ category: undefined });
              }}
            >
              전체보기
            </DropdownMenuItem>
            {CATEGORY_LIST.map((v) => {
              return (
                <DropdownMenuItem
                  className=""
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex-1 justify-between">
              {sort && order
                ? `${sortTypeRecord[sort]} (${orderTypeRecord[order]})`
                : "정렬"}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-10">
            <DropdownMenuItem
              onClick={() => {
                updateFilter({
                  sort: undefined,
                  order: undefined,
                });
              }}
            >
              기본
            </DropdownMenuItem>
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
    </>
  );
}
