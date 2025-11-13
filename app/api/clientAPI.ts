import { LoginBody, User } from "@/types/auth";
import { PostItem, PostsRequest, PostsResponse } from "@/types/post";
import { buildQuery } from "./lib/buildQuery";
import { CommonApi } from "./lib/commonApi";

export const API = {
  async login(data: LoginBody) {
    return CommonApi<User>("/api/auth", {
      body: JSON.stringify(data),
      method: "POST",
    });
  },
  async getPosts(params: PostsRequest) {
    const searchParams = buildQuery(params);
    return CommonApi<PostsResponse>(`/api/posts?${searchParams}`, {});
  },
  async getPostDetail(id: string) {
    return CommonApi<PostItem>(`/api/posts/${id}`);
  },
  async getMockPosts() {
    return CommonApi<PostsResponse>(`/api/mock`);
  },
  async postLogout() {
    return CommonApi("/api/logout", { method: "POST" });
  },
};
