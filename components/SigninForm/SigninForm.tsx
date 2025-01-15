import styles from "./styles.module.css";
import { AxiosError } from "axios";
import cookie from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import { signingIn } from "@/api/user";
type DataType = {
  message: string;
};
const SigninForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const signIn = async () => {
    try {
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
        value={name}
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        value={email}
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        value={password}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign up</button>
      <p>{errorMsg}</p>
    </div>
  );
};
export default SigninForm;
