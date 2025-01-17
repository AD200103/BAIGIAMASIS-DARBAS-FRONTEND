import { logOut } from "@/utils/logout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { checkingAuth } from "@/utils/jwtTokenDecoded";
import cookie from "js-cookie";
type LoginLogoutComponentPropsType = {
  setShowLogModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBurgerModal?: React.Dispatch<React.SetStateAction<boolean>>;
  className: string;
};
const LoginLogoutComponent = ({
  setShowLogModal,
  className,
  setShowBurgerModal,
}: LoginLogoutComponentPropsType) => {
  const [tokenExists, setTokenExists] = useState<string | undefined>(undefined);
  const router = useRouter();
  useEffect(() => {
    if (tokenExists) {
      checkingAuth(tokenExists, setTokenExists);
    }
  }, [tokenExists]);
  useEffect(() => {
    setTokenExists(cookie.get("jwt-token"));
  }, [tokenExists]);

  return tokenExists ? (
    <li
      className={className}
      onClick={() => {
        logOut(router);
      }}
    >
      Logout
    </li>
  ) : (
    <li
      className={className}
      onClick={() => {
        setShowBurgerModal!(false);
        setShowLogModal(true);
      }}
    >
      Login
    </li>
  );
};
export default LoginLogoutComponent;
