/* eslint-disable react-hooks/exhaustive-deps */
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../utils/i18n";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header/Header";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { sessionTimeLeft } from "../utils/jwtTokenDecoded";

export default function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();
  const router = useRouter();
  const token = cookie.get("jwt-token") || null;
  useEffect(() => {
    const reg = sessionStorage.getItem("region");
    let lang = "lt";
    if (reg == "Europe/London") {
      lang = "en";
    }
    let timeout = null;
    i18n.changeLanguage(lang);
    if (router.pathname !== "/signin" && token) {
      timeout = setTimeout(() => {
        cookie.remove("jwt-token");
        window.location.reload();
      }, sessionTimeLeft(token));
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [router.pathname]);

  return (
    <>
      {router.pathname !== "/signin" ? <Header /> : <></>}
      <Component {...pageProps} />
    </>
  );
}
