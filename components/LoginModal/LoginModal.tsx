import styles from "./styles.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { useState } from "react";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const body = {
    email: email,
    password: password,
  };

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:3002/login", body);
      if (response.status == 200) {
        console.log("connected successfully!");
        cookie.set("jwt-token", response.data.token);
        router.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.loginForm}>
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
      </div>
    </div>
  );
};
export default LoginModal;