import GoogleAuthService from "@/services/AuthService";
import AppwriteService from "@/services/appwriteService";
import { googleAuthScopes } from "@/providers/googleAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const code = req.headers.get("code")?.split(" ")[1] || "";
    const prompt = req.headers.get("prompt") || "consent";

    console.log("Received code:", code);

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

    console.log("Token response:", res);

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

    if (!userInfo) {
      return NextResponse.json(
        {
          success: false,
          error_state: "user_info_fetch_failed",
          message: "Failed to fetch user info",
        },
        { status: 400 }
      );
    }

    const userExists = await AppwriteService.userExists(userInfo.email!);

    console.log("User exists response:", userExists);
    console.log("Prompt value:", prompt);
    console.log("Res tokens:", res.tokens);

    if (
      userExists &&
      userExists.total === 0 &&
      prompt === "consent" &&
      res.tokens.expiry_date
    ) {
      const expiryDate = new Date(res.tokens.expiry_date).toISOString();
      
      await AppwriteService.createUser({
        name: userInfo.name || "",
        email: userInfo.email || "",
        refreshToken: res.tokens.refresh_token || "",
        accessToken: res.tokens.access_token || "",
        refreshTokenExpiry: res.tokens.expiry_date,
        profilePhotoUrl: userInfo.picture || "",
      });
      
      console.log("Token expiry date:", expiryDate);
    } else {
      console.log("User already exists in the database.");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Token fetched successfully",
        user: {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
        },
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
