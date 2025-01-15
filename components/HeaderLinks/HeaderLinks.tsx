import cookie from "js-cookie";
import Link from "next/link";
import { logOut } from "@/utils/logout";
import { useRouter } from "next/router";
import React, { SetStateAction, useEffect, useState } from "react";
import { checkingAuth } from "@/utils/jwtTokenDecoded";
type HeaderLinksPropsType = {
  setShowLogModal: React.Dispatch<SetStateAction<boolean>>;
};
const HeaderLinks = ({ setShowLogModal }: HeaderLinksPropsType) => {
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
  return (
    <nav>
      <ul>
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link href="/askquestion">
          <li>Ask a question!</li>
        </Link>
        <Link href="/signin">
          <li>Sign In</li>
        </Link>
        {tokenExists ? (
          <li
            onClick={() => {
              logOut(router);
            }}
          >
            Logout
          </li>
        ) : (
          <li onClick={() => setShowLogModal(true)}>Login</li>
        )}
      </ul>
    </nav>
  );
};
export default HeaderLinks;
