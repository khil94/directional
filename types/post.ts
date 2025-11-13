export type Category = "NOTICE" | "QNA" | "FREE";

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

export type PostSortingType = "createdAt" | "title";

export type Order = "asc" | "desc";

export interface PostsRequest {
  limit?: number;
  sort?: PostSortingType;
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
