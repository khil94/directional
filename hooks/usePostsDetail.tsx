import { getPostDetail } from "@/app/api/lib/serverAPI";
import { PostItem } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

export function usePostDetail(id: string) {
  return useQuery<PostItem>({
    queryKey: ["postDetail", id],
    queryFn: () => getPostDetail(id),
    placeholderData: (prev) => prev,
  });
}
