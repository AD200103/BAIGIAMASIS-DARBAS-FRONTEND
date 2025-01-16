import styles from "./styles.module.css";
import { AxiosError } from "axios";
import cookie from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import { signingIn } from "@/api/user";
import { inputValidation } from "@/utils/inputValidation";
import { DataType } from "@/types";
import Loader from "../Loader/Loader";

const SigninForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const [namePlacholder, setNamePLaceholder] = useState("Name");
  const [emailPlaceholder, setEmailPLaceholder] = useState("Email");
  const [passwordPlacholder, setPassPLaceholder] = useState("Password");
  const [redNameAlert, setRedNameAlert] = useState(false);
  const [redEmailAlert, setRedEmailAlert] = useState(false);
  const [redPasAlert, setRedPasAlert] = useState(false);

  const [loaderVis, setLoaderVis] = useState(false);
  const router = useRouter();
  const signIn = async () => {
    try {
      setLoaderVis(true);
      if (!name || name.trim() == "") {
        setLoaderVis(false);
        inputValidation(
          "Name is required!",
          "Name",
          setNamePLaceholder,
          setRedNameAlert,
          setName
        );
      }
      if (!email || email.trim() == "") {
        setLoaderVis(false);
        inputValidation(
          "Email is required!",
          "Email",
          setEmailPLaceholder,
          setRedEmailAlert,
          setEmail
        );
      }
      if (!password || password.trim() == "") {
        setLoaderVis(false);
        inputValidation(
          "Password is required!",
          "Password",
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
        setName("");
        setEmail("");
        setPassword("");
        router.push("/");
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      setLoaderVis(false);
      if (error.status == 403) {
        const data = error.response!.data as DataType;
        setErrorMsg(data.message);
        setTimeout(() => {
          setErrorMsg("");
        }, 2000);
      }
    }
  };

  return (
    <div className={styles.signinForm}>
      {loaderVis && <Loader />}
      <h1>Become a member!</h1>
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
        maxLength={20}
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

      <button onClick={signIn}>Sign up</button>
      <p className={styles.errMsg}>{errorMsg}</p>
    </div>
  );
};
export default SigninForm;
