import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function CommonApi(
  request: NextRequest,
  url: string
): Promise<NextResponse> {
  const API_BASE_URL = (await headers()).get("host");
  const header = new Headers(request.headers);
  try {
    const resp = await fetch(API_BASE_URL + url, {
      method: request.method,
      headers: header,
      body: request.method !== "GET" ? request.body : null,
    });
    const data = await resp.json();
    if (!resp.ok) {
      return NextResponse.json(data, { status: resp.status });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error(`CommonApi wrapper error - ${url}:`, err);
    return NextResponse.json(
      {
        error: `failed to calling api : ${err}`,
      },
      { status: 500 }
    );
  }
}

export async function AuthApi(
  request: NextRequest,
  url: string
): Promise<NextResponse> {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const API_BASE_URL = (await headers()).get("host");
  const header = new Headers(request.headers);

  if (token) {
    header.set("Authorization", `Bearer ${token}`);
  } else {
    return NextResponse.json(
      { message: "인증 필요 (토큰 없음)" },
      { status: 401 }
    );
  }

  try {
    const resp = await fetch(API_BASE_URL + url, {
      method: request.method,
      headers: header,
      body: request.method !== "GET" ? request.body : null,
    });
    const data = await resp.json();
    if (!resp.ok) {
      if (resp.status === 401) {
        cookiesStore.delete("token");
        return NextResponse.json({ message: "토큰 만료" }, { status: 401 });
      }
      return NextResponse.json(data, { status: resp.status });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error(`AuthApi wrapper error - ${url}:`, err);
    return NextResponse.json(
      {
        error: `failed to calling api : ${err}`,
      },
      { status: 500 }
    );
  }
}
