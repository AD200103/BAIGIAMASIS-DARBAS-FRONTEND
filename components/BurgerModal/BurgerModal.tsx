import styles from "./styles.module.css";
import LoginLogoutComponent from "../LoginLogoutComponent/LoginLogoutComponent";
import Link from "next/link";
import { useTranslation } from "react-i18next";

type BurgerModalPropsType = {
  showBurgerModal: boolean;
  setShowLogModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBurgerModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const links = [
  {
    id: 1,
    path: "/",
    location: "Home",
  },
  {
    id: 2,
    path: "/askquestion",
    location: "AskAQuestion",
  },
];
const BurgerModal = ({
  showBurgerModal,
  setShowLogModal,
  setShowBurgerModal,
}: BurgerModalPropsType) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${styles.burgerModal} ${
        showBurgerModal && styles.burgerModalShow
      }`}
    >
      {links.map((l) => (
        <Link
          key={l.id}
          onClick={() => {
            setShowBurgerModal(false);
          }}
          href={l.path}
        >
          {t(l.location)}
        </Link>
      ))}
      <Link href={"/signin"}>{t("SignIn")}</Link>
      <LoginLogoutComponent
        setShowLogModal={setShowLogModal}
        className={styles.login}
        setShowBurgerModal={setShowBurgerModal}
        showBurgerModal={showBurgerModal}
      />
    </div>
  );
};
export default BurgerModal;
