import { LoginBody, LoginResp } from "@/app/types/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { fetcher } from "../lib/fetcher";

export async function POST(req: NextRequest) {
  const body: LoginBody = await req.json();
  const resp = await fetcher(`auth/login`, {
    body: JSON.stringify(body),
  });

  const data: LoginResp = await resp.json();

  (await cookies()).set("token", data.token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.json(data.user);
}
