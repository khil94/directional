import { getPosts } from "@/app/api/lib/serverAPI";
import { PostsRequest, PostsResponse } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

export function usePosts(params: PostsRequest) {
  return useQuery<PostsResponse>({
    queryKey: ["posts", params],
    queryFn: () => getPosts(params),
    placeholderData: (prev) => prev,
  });
}
