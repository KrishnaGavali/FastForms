import GoogleAuthService from "@/services/AuthService";
import { googleAuthScopes } from "@/providers/googleAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const code = req.headers.get("code")?.split(" ")[1] || "";

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          error_state: "invalid_code",
          message: "Authorization code is missing",
        },
        { status: 400 }
      );
    }

    const res = await GoogleAuthService.getToken(code);

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

    GoogleAuthService.setCredentials(res.tokens);
    const userInfo = await GoogleAuthService.getUserInfo();

    console.log("User Info:", userInfo);

    return NextResponse.json(
      {
        success: true,
        message: "Token fetched successfully",
        user: userInfo,
        tokens: res.tokens,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in auth callback:", error);
    return NextResponse.json(
      {
        success: false,
        error_state: "internal_server_error",
        message: "An error occurred during authentication",
      },
      { status: 500 }
    );
  }
}
