import { LoginBody, User } from "@/types/auth";
import { PostsResponse } from "@/types/post";
import { CommonApi } from "./commonApi";

export const API = {
  async login(data: LoginBody) {
    return CommonApi<User>("/api/auth", {
      body: JSON.stringify(data),
      method: "POST",
    });
  },
  async getMockPosts() {
    return CommonApi<PostsResponse>(`/api/mock`);
  },
  async postLogout() {
    return CommonApi("/api/logout", { method: "POST" });
  },
};
