import { POSTS_REQUEST_ERROR } from "@/types/post";
import { NextRequest, NextResponse } from "next/server";
import { getTokenHeader } from "../lib/authApi";
import { fetcher } from "../lib/fetcher";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = await req.nextUrl;
    const parmas = searchParams.toString();
    const headerWithToken = await getTokenHeader();
    const resp = await fetcher(`posts?${parmas}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headerWithToken,
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
