import cookie from "js-cookie";
import Link from "next/link";
import { logOut } from "@/utils/logout";
import { useRouter } from "next/router";
import React, { SetStateAction, useEffect, useState } from "react";
import { checkingAuth } from "@/utils/jwtTokenDecoded";
import styles from "./styles.module.css";
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
      <ul className={styles.listStyle}>
        <Link href="/">
          <div
            className={`${styles.linkStyle} ${
              router.pathname == "/" && styles.linkActiveStyle
            }`}
          >
            <li>Home</li>
          </div>
        </Link>
        <Link href="/askquestion">
          <div
            className={`${styles.linkStyle} ${
              router.pathname == "/askquestion" && styles.linkActiveStyle
            }`}
          >
            <li>Ask a question!</li>
          </div>
        </Link>
        <Link href="/signin">
          <li className={styles.signInBtn}>Sign In</li>
        </Link>
        {tokenExists ? (
          <li
            className={styles.signInBtn}
            onClick={() => {
              logOut(router);
            }}
          >
            Logout
          </li>
        ) : (
          <li
            className={styles.signInBtn}
            onClick={() => setShowLogModal(true)}
          >
            Login
          </li>
        )}
      </ul>
    </nav>
  );
};
export default HeaderLinks;
