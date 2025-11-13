import { Order, SortingType } from "@/types/post";

export const sortTypeRecord: Record<SortingType, string> = {
  createdAt: "작성일",
  title: "제목",
};

export const orderTypeRecord: Record<Order, string> = {
  asc: "오름차순",
  desc: "내림차순",
};
