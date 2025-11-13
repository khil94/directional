"use server";

import {
  CreatePostRequest,
  PostItem,
  PostsRequest,
  PostsResponse,
} from "@/types/post";
import { authFetcher } from "./authApi";
import { buildQuery } from "./buildQuery";

export async function getPostDetail(id: string) {
  return authFetcher<PostItem>(`posts/${id}`);
}
export async function patchPost(id: string, data: CreatePostRequest) {
  console.log("inside fetcher", data);
  return authFetcher<PostItem>(`posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
export async function createPost(data: CreatePostRequest) {
  return authFetcher<PostItem>(`posts`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export async function deletePost(id: string) {
  return authFetcher<PostItem>(`posts/${id}`, {
    method: "DELETE",
  });
}

export async function getPosts(params: PostsRequest) {
  const searchParams = buildQuery(params);
  return authFetcher<PostsResponse>(`posts?${searchParams}`, {});
}
