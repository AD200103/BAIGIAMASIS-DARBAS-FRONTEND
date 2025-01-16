/* eslint-disable @next/next/no-img-element */
import SigninForm from "@/components/SigninForm/SigninForm";
import icon from "../../assets/img/icon.webp";
import styles from "./styles.module.css";

const MainSigninPage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <img src={icon.src} alt="icon" />
        <div className={styles.forSignIn}>
          <SigninForm />
        </div>
      </div>
    </div>
  );
};
export default MainSigninPage;
