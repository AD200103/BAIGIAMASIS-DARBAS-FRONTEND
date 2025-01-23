import cookie from "js-cookie";
import { NextRouter } from "next/router";
export const logOut = (router: NextRouter) => {
  if (cookie.get("jwt-token")!) {
    cookie.remove("jwt-token");
  }
  router.reload();
};
