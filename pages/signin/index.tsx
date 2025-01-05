import axios, { AxiosError } from "axios";
import cookie from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import PageTemplate from "@/components/PageTemplate/PageTemplate";

const MainSigninPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const body = {
    name: name,
    email: email,
    password: password,
  };

  const signIn = async () => {
    try {
      const response = await axios.post("http://localhost:3002/register", body);
      if (response.status == 200) {
        cookie.set("jwt-token", response.data.token);
        cookie.set("user-email", email);
        setName("");
        setEmail("");
        setPassword("");
        router.push("/");
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error.status == 403) {
        setErrorMsg("User with such email already exists!");
        setTimeout(() => {
          setErrorMsg("");
        }, 2000);
      }
      console.log(err);
    }
  };

  return (
    <>
      <PageTemplate>
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
      </PageTemplate>
    </>
  );
};
export default MainSigninPage;
