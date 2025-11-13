import { API } from "@/app/api/lib/clientAPI";
import { PostItem } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

export function usePostDetail(id: string) {
  return useQuery<PostItem>({
    queryKey: ["postDetail", id],
    queryFn: async () => await API.getPostDetail(id),
    placeholderData: (prev) => prev,
  });
}
