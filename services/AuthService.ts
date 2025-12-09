import { oauth2Client, googleAuthScopes } from "@/providers/googleAuth";

class GoogleAuthService {
  constructor() {}

  getRedirectURL(): string {
    return oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: googleAuthScopes,
      include_granted_scopes: true,
    });
  }

  getToken(code: string) {
    try {
      const res = oauth2Client.getToken(code);

      return res;
    } catch (error) {}
  }
}

export default GoogleAuthService;
