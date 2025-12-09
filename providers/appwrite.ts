import { Client, TablesDB } from "node-appwrite";
import { appwriteConfig } from "@/config";

export const client = new Client()
  .setEndpoint(appwriteConfig.appwrite_endpoint)
  .setProject(appwriteConfig.appwrite_project_id)
  .setKey(appwriteConfig.appwrite_api_key);

export const tablesDB = new TablesDB(client);
