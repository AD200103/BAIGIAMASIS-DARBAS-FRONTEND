import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import axios, { AxiosError } from "axios";
import { TokenType } from "@/types";

export const decodeToken = (token: string) => {
  try {
    if (token) {
      const decoded = jwt.decode(token) as TokenType;
      return decoded!.id;
    }
  } catch (error) {
    console.error(error);
  }
};

export const checkingAuth = async (
  token: string,
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const headers = { authorization: token };
    await axios.get(`${process.env.BASE_URL}/token_check`, {
      headers,
    });
  } catch (err: unknown) {
    const error = err as AxiosError;
    if (error.status == 403) {
      cookie.remove("jwt-token");
      setToken(cookie.get("jwt-token"));
      setTimeout(() => {}, 60000);
    }
  }
};
