import { NextRequest, NextResponse } from "next/server";
import { fetcher } from "../lib/fetcher";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = await req.nextUrl;
    const parmas = searchParams.toString();
    const resp = await fetcher(`posts?${parmas}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await resp.json();

    return NextResponse.json(json);
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const resp = await fetcher(`posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await resp.json();

    return NextResponse.json(json);
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
