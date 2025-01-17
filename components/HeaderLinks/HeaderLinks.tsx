import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.css";
import LoginLogoutComponent from "../LoginLogoutComponent/LoginLogoutComponent";
type HeaderLinksPropsType = {
  setShowLogModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const HeaderLinks = ({ setShowLogModal }: HeaderLinksPropsType) => {
  const router = useRouter();
  return (
    <nav className={styles.listStyleContainer}>
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
        <LoginLogoutComponent
          setShowLogModal={setShowLogModal}
          className={styles.signInBtn}
        />
      </ul>
    </nav>
  );
};
export default HeaderLinks;
