import { PostsResponse } from "@/types/post";
import { NextRequest, NextResponse } from "next/server";
import { authFetcher } from "../lib/authApi";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = await req.nextUrl;
    const parmas = searchParams.toString();
    const resp = await authFetcher<PostsResponse>(`posts?${parmas}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(resp);
  } catch (err) {
    return NextResponse.json(
      {
        error: `server error! : ${err}`,
      },
      {
        status: 500,
      }
    );
  }
}
