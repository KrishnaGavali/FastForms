import { tablesDB } from "@/providers/appwrite";
import { ID, Query } from "node-appwrite";

export type userType = {
  name: string;
  email: string;
  refreshToken: string;
  accessToken: string;
  refreshTokenExpiry: number;
  profilePhotoUrl?: string;
};

class AppwriteService {
  private dbId: string = "69383e29001a811e9e49";
  private userTableId: string = "users";

  constructor() {}

  async createUser(user: userType) {
    return tablesDB.createRow({
      databaseId: this.dbId,
      tableId: this.userTableId,
      rowId: ID.unique(),
      data: user,
    });
  }

  async userExists(email: string) {
    try {
      const response = tablesDB.listRows({
        databaseId: this.dbId,
        tableId: this.userTableId,
        queries: [
          Query.equal("email", email),
          Query.limit(1),
          Query.select(["$id"]),
        ],
      });

      return response;
    } catch (error) {
      console.log("Error checking user existence:", error);
      return null;
    }
  }
}

export default new AppwriteService();
