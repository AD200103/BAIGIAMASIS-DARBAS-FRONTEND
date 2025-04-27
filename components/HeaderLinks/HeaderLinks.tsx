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

  const linkRoutes = [
    {
      link: "/",
      location: home,
      id: 1,
    },
    { link: "/askquestion", location: askQuestion, id: 2 },
  ];

  const router = useRouter();
  return (
    <nav className={styles.listStyleContainer}>
      <ul className={styles.listStyle}>
        {linkRoutes.map((l) => (
          <Link key={l.id} href={l.link}>
            <div
              className={`${styles.linkStyle} ${
                router.pathname == l.link && styles.linkActiveStyle
              }`}
            >
              <li>{l.location}</li>
            </div>
          </Link>
        ))}
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
