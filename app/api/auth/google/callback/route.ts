import GoogleAuthService from "@/services/AuthService";
import { googleAuthScopes } from "@/providers/googleAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const code = req.headers.get("code")?.split(" ")[1] || "";

  const googleAuthService = new GoogleAuthService();

  const res = await googleAuthService.getToken(code);

  if (!res?.tokens) {
    return NextResponse.json(
      {
        success: false,
        error_state: "token_fetch_failed",
        message: "Failed to fetch token",
      },
      { status: 400 }
    );
  }

  const formsScope = res.tokens.scope?.includes(googleAuthScopes[2]);

  if (!formsScope) {
    return NextResponse.json(
      {
        success: false,
        error_state: "scopes_not_granted:forms",
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Token fetched successfully",
    },
    { status: 200 }
  );
}
