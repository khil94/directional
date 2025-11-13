import { API } from "@/app/api/apis";
import { Cursor, PostsRequest, PostsResponse } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

export function usePosts(params: PostsRequest, cursor: Cursor) {
  return useQuery<PostsResponse>({
    queryKey: ["posts", params, cursor],
    queryFn: async () => await API.getPosts(params),
    placeholderData: (prev) => prev,
  });
}
