export const CATEGORY_LIST = ["NOTICE", "QNA", "FREE"] as const;

export type Category = (typeof CATEGORY_LIST)[number];
export interface PostItem {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: Category;
  tags: string[];
  createdAt: Date;
}
export type Cursor =
  | { nextCursor: string; prevCursor?: never }
  | { prevCursor: string; nextCursor?: never }
  | undefined;

export const SORTING_TYPE_LIST = ["createdAt", "title"] as const;

export type SortingType = (typeof SORTING_TYPE_LIST)[number];

export const ORDER_LIST = ["asc", "desc"] as const;

export type Order = (typeof ORDER_LIST)[number];

export interface PostsRequest {
  limit?: number;
  sort?: SortingType;
  order?: Order;
  category?: Category;
  cursor?: Cursor;
  from?: string;
  to?: string;
  search?: string;
}

export interface PostsResponse {
  items: PostItem[];
  prevCursor: null | string;
  nextCursor: null | string;
}

export const POSTS_REQUEST_ERROR: Record<number, string> = {
  400: "Invalid Query",
  401: "Unauthorized",
};

export interface CreatePostRequest {
  title: string;
  body: string;
  category: Category;
  tags?: string[];
}
