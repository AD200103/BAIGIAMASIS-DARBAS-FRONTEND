/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.css";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import HeaderLinks from "../HeaderLinks/HeaderLinks";
import LogoComponent from "../LogoComponent/LogoComponent";
import burger from "../../assets/img/burger.svg";
import BurgerModal from "../BurgerModal/BurgerModal";
import RegionSelect from "../RegionSelect/RegionSelect";
import { useTranslation } from "react-i18next";
const Header = () => {
  const { t } = useTranslation();
  const [showLogModal, setShowLogModal] = useState(false);
  const [showBurgerModal, setShowBurgerModal] = useState(false);
  return (
    <div className={styles.main}>
      <LoginModal
        showModal={showLogModal}
        setShowModal={setShowLogModal}
        message={t("loginForFullExp")}
      />
      <BurgerModal
        setShowLogModal={setShowLogModal}
        showBurgerModal={showBurgerModal}
        setShowBurgerModal={setShowBurgerModal}
      />
      <LogoComponent />
      <div className={styles.linksAndRegion}>
        <button
          onClick={() => setShowBurgerModal(!showBurgerModal)}
          className={styles.burgerBtn}
        >
          <img src={burger.src} alt="burger" />
        </button>
        <HeaderLinks setShowLogModal={setShowLogModal} />
        <RegionSelect />
      </div>
    </div>
  );
};
export default Header;
