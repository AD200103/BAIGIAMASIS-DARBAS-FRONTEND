/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.css";
import icon from "../../assets/img/icon.webp";
import { useRouter } from "next/router";

const LogoComponent = () => {
  const router = useRouter();
  return (
    <img
      onClick={() => router.push("/")}
      className={styles.webPageLogo}
      src={icon.src}
      alt="icon"
    />
  );
};
export default LogoComponent;
