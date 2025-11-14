import { PlusCircle } from "lucide-react";
import Link from "next/link";
import PostsWrapper from "./components/postsWrapper";

export default function PostsPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <h1 className="text-3xl font-bold">게시글 목록</h1>
          {/* 4. 게시글 작성 버튼 */}
          <Link
            href={"/posts/write"}
            className="bg-black flex flex-row p-4 text-white items-center rounded-2xl"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            게시글 작성
          </Link>
        </div>
      </div>
      <div>
        <PostsWrapper />
      </div>
    </div>
  );
}
