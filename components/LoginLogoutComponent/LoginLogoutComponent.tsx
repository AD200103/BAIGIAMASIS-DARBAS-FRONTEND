/* eslint-disable react-hooks/exhaustive-deps */
import { logOut } from "@/utils/logout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { checkingAuth } from "@/utils/jwtTokenDecoded";
import cookie from "js-cookie";
import { useTranslation } from "react-i18next";

type LoginLogoutComponentPropsType = {
  setShowLogModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBurgerModal: React.Dispatch<React.SetStateAction<boolean>>;
  showBurgerModal: boolean;
  className: string;
};
const LoginLogoutComponent = ({
  setShowLogModal,
  className,
  setShowBurgerModal,
  showBurgerModal,
}: LoginLogoutComponentPropsType) => {
  const [tokenExists, setTokenExists] = useState<string | undefined>(undefined);
  const [login, setLogin] = useState("");
  const [logout, setLogout] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (tokenExists) {
      checkingAuth(tokenExists, setTokenExists);
    }
    setTokenExists(cookie.get("jwt-token"));
  }, [tokenExists]);

  useEffect(() => {
    setLogout(t("Logout"));
    setLogin(t("Login"));
  }, [login, logout]);

  const { t } = useTranslation();
  return tokenExists ? (
    <li
      className={className}
      onClick={() => {
        logOut(router);
      }}
    >
      {logout}
    </li>
  ) : (
    <li
      className={className}
      onClick={() => {
        if (showBurgerModal) {
          setShowBurgerModal(false);
        }
        setShowLogModal(true);
      }}
    >
      {login}
    </li>
  );
};
export default LoginLogoutComponent;
