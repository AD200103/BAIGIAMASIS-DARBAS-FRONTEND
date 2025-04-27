/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./styles.module.css";
import { AxiosError } from "axios";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signingIn } from "@/api/user";
import { useTranslation } from "react-i18next";
import signErrFunc from "@/utils/signInAPIfunc";
import Loader from "../Loader/Loader";
import { getInputArrProps, getInputFields } from "../../utils/signInFormArrs";
import signInRequiredAlerts from "@/utils/signInRequiredAlerts";

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

  const inputArrProps = getInputArrProps({
    name,
    email,
    password,
    redNameAlert,
    redEmailAlert,
    redPasAlert,
    namePlacholder,
    emailPlaceholder,
    passwordPlacholder,
    setName,
    setEmail,
    setPassword,
  });

  const inputFields = getInputFields({
    name,
    email,
    password,
    t,
    setNamePLaceholder,
    setEmailPLaceholder,
    setPassPLaceholder,
    setRedNameAlert,
    setRedEmailAlert,
    setRedPasAlert,
    setName,
    setEmail,
    setPassword,
  });

  useEffect(() => {
    setNamePLaceholder(t("Name"));
    setEmailPLaceholder(t("Email"));
    setPassPLaceholder(t("Password"));
    setSignUp(t("SignUp"));
  }, [signUp]);

  const signIn = async () => {
    try {
      setLoaderVis(true);
      if (name.trim() == "" || email.trim() == "" || password.trim() == "") {
        signInRequiredAlerts({
          inputFields,
          setLoaderVis,
        });
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
      if (error.status == 403) {
        signErrFunc({
          setLoaderVis,
          error,
          setErrorMsg,
          setRedNameAlert,
          setRedEmailAlert,
          t,
        });
      }
    }
  };
  return (
    <div className={styles.signinForm}>
      {loaderVis && <Loader />}
      <h1>{t("SignUp")}</h1>
      {inputArrProps.map((i) => (
        <input
          key={i.key}
          className={`${styles.input} ${i.redAlert ? styles.redAlert : ""}`}
          value={i.value}
          maxLength={i.maxLength}
          type={i.type}
          placeholder={i.placeholder}
          onChange={(e) => i.onChangeFunction(e.target.value)}
        />
      ))}
      <button onClick={signIn}>{signUp}</button>
      <p className={styles.errMsg}>{errorMsg}</p>
    </div>
  );
};
export default SigninForm;
