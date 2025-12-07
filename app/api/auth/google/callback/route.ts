import GoogleAuthService from "@/services/AuthService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const code = req.headers.get("code")?.split(" ")[1] || "";

  const googleAuthService = new GoogleAuthService();

  const res = await googleAuthService.getToken(code);

  return NextResponse.json(
    {
      success: true,
      message: "Token fetched successfully",
    },
    { status: 200 }
  );
}
