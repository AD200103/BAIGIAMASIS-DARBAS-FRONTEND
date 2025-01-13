import Link from "next/link";
import styles from "./styles.module.css";
import { logOut } from "@/utils/logout";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { checkingAuth } from "@/utils/jwtTokenDecoded";
type HeaderPropsType = {
  showLogModal: boolean;
  setShowLogModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const Header = ({ showLogModal, setShowLogModal }: HeaderPropsType) => {
  const router = useRouter();
  const [tokenExists, setTokenExists] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (tokenExists) {
      checkingAuth(tokenExists, setTokenExists);
    }
  }, [tokenExists]);

  useEffect(() => {
    setTokenExists(cookie.get("jwt-token"));
  }, [tokenExists]);

  return (
    <div className={styles.main}>
      <h1>AskOverload</h1>
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
            <li onClick={() => setShowLogModal(!showLogModal)}>Login</li>
          )}
        </ul>
      </nav>
    </div>
  );
};
export default Header;
