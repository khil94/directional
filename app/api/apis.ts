import { LoginBody, User } from "@/types/auth";
import { PostsRequest, PostsResponse } from "@/types/post";
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
    return CommonApi<PostsResponse>(`/api/posts?${searchParams}`, {
      method: "GET",
    });
  },
};
