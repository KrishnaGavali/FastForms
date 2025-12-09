import GoogleAuthService from "@/services/AuthService";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.redirect(GoogleAuthService.getRedirectURL());
}
