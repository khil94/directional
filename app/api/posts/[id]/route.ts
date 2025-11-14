import { NextRequest, NextResponse } from "next/server";
import { fetcher } from "../../lib/fetcher";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const resp = await fetcher(`posts/${id}`, {
      method: "GET",
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const resp = await fetcher(`posts/${id}`, {
      method: "PATCH",
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const resp = await fetcher(`posts/${id}`, {
      method: "DELETE",
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
