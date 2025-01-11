import Link from "next/link";
import styles from "./styles.module.css";
const Header = () => {
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
          <Link href="/login">
            <li>Login</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};
export default Header;
