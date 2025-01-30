/* eslint-disable react-hooks/exhaustive-deps */
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../utils/i18n";
import { useTranslation } from "react-i18next";

export default function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();

  const date = new Date();
  const dateFormed = Math.floor(date.getTime() / 1000);

  useEffect(() => {
    const reg = sessionStorage.getItem("region");
    let lang = "lt";
    if (reg == "Europe/London") {
      lang = "en";
    }
    i18n.changeLanguage(lang);
    console.log(dateFormed);
  }, []);

  return <Component {...pageProps} />;
}
