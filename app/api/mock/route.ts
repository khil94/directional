import { POSTS_REQUEST_ERROR } from "@/types/post";
import { NextRequest, NextResponse } from "next/server";
import { fetcher } from "../lib/fetcher";

export async function GET(req: NextRequest) {
  try {
    const resp = await fetcher(`mock/posts?count=100`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) {
      throw new Error(
        `Get Posts Error : ${POSTS_REQUEST_ERROR[resp.status] ?? resp.status}`
      );
    }
    const data = await resp.json();
    return NextResponse.json(data);
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
