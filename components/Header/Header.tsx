import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import cookie from "js-cookie";
const Header = () => {
  const getCookie = cookie.get("jwt-token");
  const router = useRouter();
  const logOut = () => {
    cookie.remove("jwt-token");
    router.push("/");
  };
  return (
    <div className={styles.main}>
      <h1>AskOverload</h1>
      <nav>
        <ul>
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/ask_question">
            <li>Ask a question!</li>
          </Link>
          <Link href="/signin">
            <li>Sign In</li>
          </Link>
          {/* {!getCookie ? (
            <li className={styles.login}>Login</li>
          ) : (
            <li className={styles.logout} onClick={logOut}>
              Logout
            </li>
          )} */}
        </ul>
      </nav>
    </div>
  );
};
export default Header;
