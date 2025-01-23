import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../utils/i18n";
import { useTranslation } from "react-i18next";

export default function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const reg = localStorage.getItem("region");
    let lang = "lt";
    if (reg == "Europe/Vilnius") {
      lang = "lt";
    }
    if (reg == "Europe/London") {
      lang = "en";
    }
    i18n.changeLanguage(lang);
  }, []);

  return <Component {...pageProps} />;
}
