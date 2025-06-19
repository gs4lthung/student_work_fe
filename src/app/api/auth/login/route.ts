import { login } from "@/api/user-api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body || !body.usernameOrEmail || !body.password) {
    return NextResponse.json(
      { error: "Username or email and password are required" },
      { status: 400 }
    );
  }
  const { usernameOrEmail, password } = body;

  const result = await login({ usernameOrEmail, password });

  if (!result) {
    return NextResponse.json(
      { error: "Invalid login credentials" },
      { status: 401 }
    );
  }

  const { user, accessToken, refreshToken, role } = result;

  (await cookies()).set("accessToken", accessToken, {
    maxAge: 3600, // 1 hour
    path: "/",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  (await cookies()).set("refreshToken", refreshToken, {
    maxAge: 86400, // 1 day
    path: "/",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  (await cookies()).set("userRole", role, {
    maxAge: 3600, // 1 hour
    path: "/",
    httpOnly: false, // allow middleware to read it
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return NextResponse.json({
    result: {
      user,
      accessToken,
      refreshToken,
      role: role,
    },
  });
}
