/* eslint-disable react-hooks/exhaustive-deps */
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../utils/i18n";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header/Header";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();
  const router = useRouter();
  useEffect(() => {
    const reg = sessionStorage.getItem("region");
    let lang = "lt";
    if (reg == "Europe/London") {
      lang = "en";
    }
    i18n.changeLanguage(lang);
  }, []);

  return (
    <>
      {router.pathname !== "/signin" ? <Header /> : <></>}
      <Component {...pageProps} />
    </>
  );
}
