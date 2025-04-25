/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./styles.module.css";
import { AxiosError } from "axios";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signingIn } from "@/api/user";
import { inputValidation } from "@/utils/inputValidation";
import { DataType } from "@/types";
import { useTranslation } from "react-i18next";
import Loader from "../Loader/Loader";

const SigninForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { t } = useTranslation();
  const [namePlacholder, setNamePLaceholder] = useState("");
  const [emailPlaceholder, setEmailPLaceholder] = useState("");
  const [passwordPlacholder, setPassPLaceholder] = useState("");
  const [redNameAlert, setRedNameAlert] = useState(false);
  const [redEmailAlert, setRedEmailAlert] = useState(false);
  const [redPasAlert, setRedPasAlert] = useState(false);
  const [signUp, setSignUp] = useState("");

  const [loaderVis, setLoaderVis] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setNamePLaceholder(t("Name"));
    setEmailPLaceholder(t("Email"));
    setPassPLaceholder(t("Password"));
    setSignUp(t("SignUp"));
  }, [signUp]);

  const signIn = async () => {
    try {
      setLoaderVis(true);
      if (!name || name.trim() == "") {
        setLoaderVis(false);
        inputValidation(
          t("signNameReq"),
          t("Name"),
          setNamePLaceholder,
          setRedNameAlert,
          setName
        );
      }
      if (!email || email.trim() == "") {
        setLoaderVis(false);
        inputValidation(
          t("signEmailReq"),
          t("Email"),
          setEmailPLaceholder,
          setRedEmailAlert,
          setEmail
        );
      }
      if (!password || password.trim() == "") {
        setLoaderVis(false);
        inputValidation(
          t("signPassReq"),
          t("Password"),
          setPassPLaceholder,
          setRedPasAlert,
          setPassword
        );
      }
      if (name.trim() == "" || email.trim() == "" || password.trim() == "") {
        setLoaderVis(false);
        return;
      }

      const body = {
        name: name,
        email: email,
        password: password,
      };
      const response = await signingIn(body);
      if (response.status == 200) {
        cookie.set("jwt-token", response.data.token);
        router.push("/");
        sessionStorage.setItem("pageNumber", "1");
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      setLoaderVis(false);
      if (error.status == 403) {
        const data = error.response!.data as DataType;
        const msg = data.message;
        if (msg == "Username already exists!") {
          setErrorMsg(t("singUsrnExists"));
          setRedNameAlert(true);
        }
        if (msg == "Email and username already exists!") {
          setErrorMsg(t("singUsrnEmailExists"));
          setRedNameAlert(true);
          setRedEmailAlert(true);
        }
        if (msg == "Email already exists!") {
          setErrorMsg(t("singEmailExists"));
          setRedEmailAlert(true);
        }
        setTimeout(() => {
          setErrorMsg("");
          setRedEmailAlert(false);
          setRedNameAlert(false);
        }, 2000);
      }
    }
  };

  return (
    <div className={styles.signinForm}>
      {loaderVis && <Loader />}
      <h1>{t("SignUp")}</h1>
      <input
        className={`${styles.input} ${redNameAlert && styles.redAlert}`}
        value={name}
        maxLength={20}
        type="text"
        placeholder={namePlacholder}
        onChange={(e) => setName(e.target.value)}
      />
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
        value={password}
        maxLength={20}
        type="password"
        placeholder={passwordPlacholder}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={signIn}>{signUp}</button>
      <p className={styles.errMsg}>{errorMsg}</p>
    </div>
  );
};
export default SigninForm;
