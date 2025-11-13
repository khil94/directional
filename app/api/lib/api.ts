import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL;

export async function AuthApi(request: NextRequest, url: string) {
  const token = (await cookies()).get("token")?.value;
  const headers = new Headers(request.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  } else {
    return NextResponse.json({ message: "인증 필요" }, { status: 401 });
  }

  try {
    const resp = await fetch(`${API_BASE_URL}/${url}`, {
      method: request.method,
      headers: headers,
      body: request.method !== "GET" ? request.body : null,
    });

    if (resp.ok) {
      return NextResponse.json(resp.body, { status: resp.status });
    } else {
      if (resp.status === 401) {
        (await cookies()).delete("token");
      }
      return NextResponse.json(resp.body, {
        status: resp.status,
      });
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: `failed to calling api : ${err}`,
      },
      {
        status: 500,
      }
    );
  }
}
