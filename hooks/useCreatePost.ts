"use client";

import { createPost, deletePost, patchPost } from "@/app/api/lib/serverAPI";
import { CreatePostRequest } from "@/types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostMutation(id?: string) {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (data: CreatePostRequest) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const update = useMutation({
    mutationFn: (data: CreatePostRequest) => patchPost(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });

  const remove = useMutation({
    mutationFn: () => deletePost(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    create,
    remove,
    update,
  };
}
