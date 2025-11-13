import { NextRequest, NextResponse } from "next/server";
import { fetcher } from "../../lib/fetcher";

export async function GET(req: NextRequest) {
  try {
    const resp = await fetcher(`/mock/coffee-consumption`, {
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
