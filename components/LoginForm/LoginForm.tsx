import styles from "./styles.module.css";
import { useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { logingIn } from "@/api/user";
import LogoComponent from "../LogoComponent/LogoComponent";
import { AxiosError } from "axios";
import { inputValidation } from "@/utils/inputValidation";
type LoginFormPropsType = {
  message: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};
type DataType = {
  message: string;
};
const LoginForm = ({ message, setShowModal }: LoginFormPropsType) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [emailPlaceholder, setEmailPLaceholder] = useState("email");
  const [passwordPlacholder, setPassPLaceholder] = useState("password");
  const [redEmailAlert, setRedEmailAlert] = useState(false);
  const [redPasAlert, setRedPasAlert] = useState(false);
  const router = useRouter();
  const login = async () => {
    try {
      if (!email || email.trim() == "") {
        inputValidation(
          "email is required!",
          "email",
          setEmailPLaceholder,
          setRedEmailAlert,
          setEmail
        );
      }
      if (!password || password.trim() == "") {
        inputValidation(
          "password is required!",
          "password",
          setPassPLaceholder,
          setRedPasAlert,
          setPassword
        );
      }
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
      if (error.status == 403) {
        const data = error.response!.data as DataType;
        setErrMessage(data.message);
        setTimeout(() => {
          setErrMessage("");
        }, 2000);
      }
      console.log(err);
    }
  };
  return (
    <div className={styles.loginForm}>
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
      <button onClick={login}>Login</button>
      <div className={styles.signInProps}>
        <p>Not yet a member?</p>
        <p className={styles.signInText} onClick={() => router.push("/signin")}>
          Sign in
        </p>
      </div>
    </div>
  );
};
export default LoginForm;
