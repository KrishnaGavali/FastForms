import { oauth2Client, googleAuthScopes } from "@/providers/googleAuth";
import { google } from "googleapis";

class GoogleAuthService {
  public oauthClient = oauth2Client;

  constructor() {}

  getRedirectURL(): string {
    return this.oauthClient.generateAuthUrl({
      access_type: "offline",
      scope: googleAuthScopes,
      include_granted_scopes: true,
    });
  }

  getToken(code: string) {
    try {
      const res = this.oauthClient.getToken(code);

      return res;
    } catch (error) {}
  }

  setCredentials(tokens: any) {
    this.oauthClient.setCredentials(tokens);
  }

  async getUserInfo() {
    try {
      const oauth2 = google.oauth2({
        auth: this.oauthClient,
        version: "v2",
      });

      const userInfo = await oauth2.userinfo.get();
      return userInfo.data;
    } catch (error) {
      console.log("Error fetching user info:", error);
    }
  }
}

export default new GoogleAuthService();
