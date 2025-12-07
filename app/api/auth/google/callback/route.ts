import { googleAuthScopes } from "@/providers/googleAuth";
import GoogleAuthService from "@/services/AuthService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const code = req.headers.get("code")?.split(" ")[1] || "";

  const googleAuthService = new GoogleAuthService();

  googleAuthService.getToken(code).then(async (res) => {
    const tokens = res.tokens;
    console.log(res);
    console.log("Tokens:", tokens);
  });

  return NextResponse.json(
    {
      success: true,
      message: "Token fetched successfully",
    },
    { status: 200 }
  );
}
