/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { logingIn } from "@/api/user";
import LogoComponent from "../LogoComponent/LogoComponent";
import { AxiosError } from "axios";
import { inputValidation } from "@/utils/inputValidation";
import { useTranslation } from "react-i18next";
import Loader from "../Loader/Loader";
type LoginFormPropsType = {
  message: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const LoginForm = ({ message, setShowModal }: LoginFormPropsType) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [emailPlaceholder, setEmailPLaceholder] = useState("");
  const [passwordPlacholder, setPassPLaceholder] = useState("");
  const [redEmailAlert, setRedEmailAlert] = useState(false);
  const [redPasAlert, setRedPasAlert] = useState(false);
  const [loaderVis, setLoaderVis] = useState(false);
  const [signIn, setSignIn] = useState("");

  useEffect(() => {
    setEmailPLaceholder(t("email"));
    setPassPLaceholder(t("password"));
    setSignIn(t("SignIn"));
  }, [signIn]);

  const router = useRouter();
  const login = async () => {
    try {
      setLoaderVis(true);
      if (!email || email.trim() == "") {
        setLoaderVis(false);
        inputValidation(
          t("emailReq"),
          t("email"),
          setEmailPLaceholder,
          setRedEmailAlert,
          setEmail
        );
      }
      if (!password || password.trim() == "") {
        setLoaderVis(false);
        inputValidation(
          t("passwordReq"),
          t("password"),
          setPassPLaceholder,
          setRedPasAlert,
          setPassword
        );
      }
      if (email.trim() == "" || password.trim() == "") {
        setLoaderVis(false);
        return;
      }
      const body = {
        email: email,
        password: password,
      };
      const response = await logingIn(body);
      if (response.status == 200) {
        cookie.set("jwt-token", response.data.token);
        router.reload();
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      setLoaderVis(false);
      if (error.status == 403) {
        setErrMessage(t("loginErrMsg"));
        setTimeout(() => {
          setErrMessage("");
        }, 2000);
      }
      console.log(err);
    }
  };
  return (
    <div className={styles.loginForm}>
      {loaderVis && <Loader />}
      <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
        X
      </button>
      <LogoComponent />
      <p className={styles.msg}>{message}</p>
      <input
        className={`${styles.input} ${redEmailAlert && styles.redAlert}`}
        value={email}
        maxLength={60}
        type="text"
        placeholder={emailPlaceholder}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={`${styles.input} ${redPasAlert && styles.redAlert}`}
        maxLength={30}
        value={password}
        type="password"
        placeholder={passwordPlacholder}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className={styles.errMsg}>{errMessage}</p>
      <button onClick={login}>{t("Login")}</button>
      <div className={styles.signInProps}>
        <p>{t("NotMember")}</p>
        <p
          className={styles.signInText}
          onClick={() => {
            setLoaderVis(true);
            router.push("/signin");
          }}
        >
          {signIn}
        </p>
      </div>
    </div>
  );
};
export default LoginForm;
