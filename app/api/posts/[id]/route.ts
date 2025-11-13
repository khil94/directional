import { NextRequest, NextResponse } from "next/server";
import { authFetcher } from "../../lib/authApi";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const resp = await authFetcher(`posts/${id}`, {
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
