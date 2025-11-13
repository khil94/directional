import { LoginBody, User } from "@/types/auth";
import { CommonApi } from "./lib/commonApi";

export const API = {
  async login(data: LoginBody) {
    return CommonApi<User>("/api/auth", {
      body: JSON.stringify(data),
      method: "POST",
    });
  },
};
