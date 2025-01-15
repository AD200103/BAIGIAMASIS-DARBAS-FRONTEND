import styles from "./styles.module.css";
import { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
type LoginFormPropsType = {
  message: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const LoginForm = ({ message, setShowModal }: LoginFormPropsType) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const login = async () => {
    try {
      const body = {
        email: email,
        password: password,
      };
      const response = await axios.post("http://localhost:3002/login", body);
      if (response.status == 200) {
        cookie.set("jwt-token", response.data.token);
        router.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.loginForm}>
      <button onClick={() => setShowModal(false)}>Close</button>
      <p>{message}</p>
      <input
        value={email}
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        value={password}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      <p>Not yet a member?</p>
      <button onClick={() => router.push("/signin")}>Sign in</button>
    </div>
  );
};
export default LoginForm;
