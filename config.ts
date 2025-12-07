interface googlAuthConfigType {
  google_auth_client: string;
  google_auth_client_secret: string;
  googl_auth_redirect_url: string;
}

export const googleAuthConfig: googlAuthConfigType = {
  google_auth_client: process.env.GOOGLE_AUTH_CLIENT_ID || "",
  google_auth_client_secret: process.env.GOOGLE_AUTH_CLIENT_SECRET || " ",
  googl_auth_redirect_url: process.env.GOOGLE_AUTH_REDIRECT_URL || " ",
};
