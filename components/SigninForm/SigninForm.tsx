import styles from "./styles.module.css";
import { AxiosError } from "axios";
import cookie from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import { signingIn } from "@/api/user";
import { signinValidation } from "@/utils/signinValidation";
type DataType = {
  message: string;
};
const SigninForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [namePlacholder, setNamePLaceholder] = useState("Name");
  const [emailPlacholder, setEmailPLaceholder] = useState("Email");
  const [passwordPlacholder, setPassPLaceholder] = useState("Password");
  const [redNameAlert, setRedNameAlert] = useState(false);
  const [redEmailAlert, setRedEmailAlert] = useState(false);
  const [redPasAlert, setRedPasAlert] = useState(false);

  const router = useRouter();
  const signIn = async () => {
    try {
      // if (name.trim() == "") {
      //   setName("");
      // }
      // if (email.trim() == "") {
      //   setEmail("");
      // }

      if (!name) {
        signinValidation("Name", setNamePLaceholder, setRedNameAlert);
      }
      if (!email) {
        signinValidation("Email", setEmailPLaceholder, setRedEmailAlert);
      }
      if (!password) {
        signinValidation("Password", setPassPLaceholder, setRedPasAlert);
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
      <h1>Become a member!</h1>
      <input
        className={`${styles.input} ${redNameAlert && styles.redAlert}`}
        value={name}
        type="text"
        placeholder={namePlacholder}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className={`${styles.input} ${redEmailAlert && styles.redAlert}`}
        value={email}
        type="email"
        placeholder={emailPlacholder}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={`${styles.input} ${redPasAlert && styles.redAlert}`}
        value={password}
        type="password"
        placeholder={passwordPlacholder}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign up</button>
      <p>{errorMsg}</p>
    </div>
  );
};
export default SigninForm;
