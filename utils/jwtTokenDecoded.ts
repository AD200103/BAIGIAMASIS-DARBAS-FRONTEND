import jwt from "jsonwebtoken";
import { TokenType } from "@/types";

export const decodeToken = (token: string) => {
  try {
    if (token) {
      const decoded = jwt.decode(token) as TokenType;
      return decoded;
    }
  } catch (error) {
    console.error(error);
  }
};

export const sessionTimeLeft = (token: string) => {
  const currentTime = Math.floor(new Date().getTime() / 1000) - 170;
  const expiresIn = decodeToken(token)!.exp;
  const timeLeft = expiresIn - currentTime;
  return timeLeft * 1000;
};
