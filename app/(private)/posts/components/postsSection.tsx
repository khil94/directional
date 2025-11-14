import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PostsResponse } from "@/types/post";
import router from "next/router";

interface props {
  data: PostsResponse;
}

export default function PostsSection({ data }: props) {
  return (
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
        {data.items.map((v) => {
          return (
            <TableRow key={v.id} onClick={() => router.push(`/posts/${v.id}`)}>
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
  );
}
