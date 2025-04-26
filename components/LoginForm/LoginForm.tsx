/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { logingIn } from "@/api/user";
import LogoComponent from "../LogoComponent/LogoComponent";
import { AxiosError } from "axios";
import { inputValidity, loginValues } from "@/utils/inputValidation";
import { useTranslation } from "react-i18next";
import LoginFormInputs from "../LoginFormInput/LoginFormInput";
import Loader from "../Loader/Loader";
import SignInRouteBtn from "../SignInRouteBtn/SignInRouteBtn";
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

  const values = loginValues({
    email,
    t,
    setEmailPLaceholder,
    setRedEmailAlert,
    setEmail,
    password,
    setPassPLaceholder,
    setRedPasAlert,
    setPassword,
  });

  const router = useRouter();
  const login = async () => {
    try {
      setLoaderVis(true);
      inputValidity(values, setLoaderVis);
      if (email.trim() == "" || password.trim() == "") {
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
      <LoginFormInputs
        email={email}
        redEmailAlert={redEmailAlert}
        emailPlaceholder={emailPlaceholder}
        setEmail={setEmail}
        redPasAlert={redPasAlert}
        password={password}
        passwordPlacholder={passwordPlacholder}
        setPassword={setPassword}
      />
      <p className={styles.errMsg}>{errMessage}</p>
      <button onClick={login}>{t("Login")}</button>
      <SignInRouteBtn setLoaderVis={setLoaderVis} signIn={signIn} />
    </div>
  );
};
export default LoginForm;
