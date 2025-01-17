import styles from "./styles.module.css";
import { useRouter } from "next/router";
import LoginLogoutComponent from "../LoginLogoutComponent/LoginLogoutComponent";
import Link from "next/link";

type BurgerModalPropsType = {
  showBurgerModal: boolean;
  setShowLogModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBurgerModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const BurgerModal = ({
  showBurgerModal,
  setShowLogModal,
  setShowBurgerModal,
}: BurgerModalPropsType) => {
  const router = useRouter();
  return (
    <div
      className={`${styles.burgerModal} ${
        showBurgerModal && styles.burgerModalShow
      }`}
    >
      <Link
        onClick={() => router.pathname == "/" && setShowBurgerModal(false)}
        href={"/"}
      >
        Home
      </Link>
      <Link href={"/signin"}>Sign in</Link>
      <Link
        onClick={() =>
          router.pathname == "/askquestion" && setShowBurgerModal(false)
        }
        href={"/askquestion"}
      >
        Ask a question!
      </Link>
      <LoginLogoutComponent
        setShowLogModal={setShowLogModal}
        className={styles.login}
        setShowBurgerModal={setShowBurgerModal}
      />
    </div>
  );
};
export default BurgerModal;
