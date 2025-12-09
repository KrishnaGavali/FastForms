import { tablesDB } from "@/providers/appwrite";
import { ID } from "node-appwrite";

export type userType = {
  name: string;
  email: string;
  refreshToken: string;
  accessToken: string;
  refreshTokenExpiry: Date;
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
}

export default AppwriteService;
