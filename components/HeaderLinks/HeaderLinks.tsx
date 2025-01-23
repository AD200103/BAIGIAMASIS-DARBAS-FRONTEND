/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { useState } from "react";
import LoginLogoutComponent from "../LoginLogoutComponent/LoginLogoutComponent";
import { useTranslation } from "react-i18next";
type HeaderLinksPropsType = {
  setShowLogModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const HeaderLinks = ({ setShowLogModal }: HeaderLinksPropsType) => {
  const [showBurgerModal, setShowBurgerModal] = useState(false);
  const [home, setHome] = useState("");
  const [askQuestion, setAskQuestion] = useState("");
  const [signIn, setSignIn] = useState("");

  const { t } = useTranslation();
  useEffect(() => {
    setHome(t("Home"));
    setAskQuestion(t("AskAQuestion"));
    setSignIn(t("SignIn"));
  }, [home, askQuestion, signIn]);

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
            <li>{home}</li>
          </div>
        </Link>
        <Link href="/askquestion">
          <div
            className={`${styles.linkStyle} ${
              router.pathname == "/askquestion" && styles.linkActiveStyle
            }`}
          >
            <li>{askQuestion}!</li>
          </div>
        </Link>
        <Link href="/signin">
          <li className={styles.signInBtn}>{signIn}</li>
        </Link>
        <LoginLogoutComponent
          setShowLogModal={setShowLogModal}
          className={styles.signInBtn}
          showBurgerModal={showBurgerModal}
          setShowBurgerModal={setShowBurgerModal}
        />
      </ul>
    </nav>
  );
};
export default HeaderLinks;
