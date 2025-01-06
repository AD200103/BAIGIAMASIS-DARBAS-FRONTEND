import jwt from "jsonwebtoken";
import { TokenType } from "@/types";
export const decodeToken = (token: string) => {
  try {
    if (token) {
      const decoded = jwt.decode(token) as TokenType;
      return decoded!.id;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
};
