import styles from "./styles.module.css";
import Link from "next/link";
const Header = () => {
  return (
    <div className={styles.main}>
      <h1>AskOverload</h1>
      <nav>
        <ul>
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/question">
            <li>Ask a question!</li>
          </Link>
          <Link href="/signin">
            <li>Sign In</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};
export default Header;
