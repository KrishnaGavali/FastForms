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

export const appwriteConfig = {
  appwrite_endpoint: process.env.APPWRITE_ENDPOINT || "",
  appwrite_project_id: process.env.APPWRITE_PROJECT_ID || "",
  appwrite_api_key: process.env.APPWRITE_API_KEY || "",
};
