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
}

export default GoogleAuthService;
