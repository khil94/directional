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
type Cursor =
  | { nextCursor: string; prevCursor?: never }
  | { prevCursor: string; nextCursor?: never };

export interface PostsRequest {
  limit?: number;
  sort?: "createdAt" | "title";
  order?: "asc" | "desc";
  category?: Category;
  cursor?: Cursor;
  from?: string;
  to?: string;
  search?: string;
}

export interface PostsResponse {
  items: PostItem;
  prevCursor: null | string;
  nextCursor: null | string;
}

export const POSTS_REQUEST_ERROR: Record<number, string> = {
  400: "Invalid Query",
  401: "Unauthorized",
};
