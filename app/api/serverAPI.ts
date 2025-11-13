import { PostItem } from "@/types/post";
import { authFetcher } from "./lib/authApi";

export const ServerAPI = {
  async getPostDetail(id: string) {
    return authFetcher<PostItem>(`posts/${id}`);
  },
};
