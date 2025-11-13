import { getPosts } from "@/app/api/lib/serverAPI";
import { Cursor, PostsRequest, PostsResponse } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

export function usePosts(params: PostsRequest, cursor: Cursor) {
  return useQuery<PostsResponse>({
    queryKey: ["posts", params, cursor],
    queryFn: () => getPosts(params),
    placeholderData: (prev) => prev,
  });
}
