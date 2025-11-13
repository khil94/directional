"use client";

import { createPost, patchPost } from "@/app/api/lib/serverAPI";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { BanWordChecker } from "@/lib/banChecker";
import { Category, CATEGORY_LIST, CreatePostRequest } from "@/types/post";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TagMaker } from "./tagMaker";

interface Mode {
  id: string;
  mode: "edit";
}

interface props {
  initialData?: CreatePostRequest;
  mode?: Mode;
}

export default function PostForm({ mode, initialData }: props) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [body, setBody] = useState(initialData?.body ?? "");
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? []);
  const [category, setCategory] = useState<Category>(
    initialData?.category ?? "FREE"
  );
  const router = useRouter();

  function checker() {
    const tagCheck = tags.every((v) => BanWordChecker(v));
    return BanWordChecker(title) || BanWordChecker(body) || tagCheck;
  }

  async function handleEdit() {
    if (checker()) {
      alert("금칙어가 들어있습니다.");
      return;
    }
    const answer = confirm("수정하시겠습니까");
    if (answer) {
      console.log("test", mode?.id);
      await patchPost(mode!.id, {
        title,
        body,
        category,
        tags,
      } as CreatePostRequest);
      router.replace(`/posts/${mode!.id}`);
    }
  }

  async function handleWrite() {
    if (checker()) {
      alert("금칙어가 들어있습니다.");
      return;
    }
    const answer = confirm("작성하시겠습니까?");
    if (answer) {
      await createPost({
        title,
        body,
        category,
        tags,
      });
      router.replace(`/posts`);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-base font-semibold leading-7 text-blue-600">
          {/* 2. 필터(카테고리별 필터링) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 justify-between">
                {category ?? "카테고리"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {CATEGORY_LIST.map((v) => {
                return (
                  <DropdownMenuItem
                    onClick={() => {
                      setCategory(v);
                    }}
                    key={v}
                  >
                    {v}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* 제목 */}
        <input
          placeholder="제목"
          value={title}
          className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl p-4 border-border border-2 rounded-2xl"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="mt-10 prose prose-lg prose-slate max-w-none">
          <Textarea
            placeholder="본문"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div className="mt-10 border-t border-gray-900/5 pt-6">
          <div className="flex items-center gap-x-4">
            <span className="text-sm font-medium leading-6 text-gray-900">
              Tags
            </span>
            <TagMaker value={tags} onChange={(v) => setTags(v)} />
          </div>
        </div>
        <div className="mt-10 flex justify-end gap-x-4">
          <Button variant="secondary">
            <Link
              href={`${mode?.mode === "edit" ? `/posts/${mode.id}` : `/posts`}`}
            >
              취소
            </Link>
          </Button>
          <Button
            type="button"
            onClick={async () => {
              if (mode?.mode === "edit") {
                await handleEdit();
              } else {
                await handleWrite();
              }
            }}
            variant="outline"
          >
            {mode?.mode === "edit" ? "수정" : "작성"}
          </Button>
        </div>
      </div>
    </div>
  );
}
