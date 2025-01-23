/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.css";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import HeaderLinks from "../HeaderLinks/HeaderLinks";
import LogoComponent from "../LogoComponent/LogoComponent";
import burger from "../../assets/img/burger.svg";
import BurgerModal from "../BurgerModal/BurgerModal";
import RegionSelect from "../RegionSelect/RegionSelect";
const Header = () => {
  const [showLogModal, setShowLogModal] = useState(false);
  const [showBurgerModal, setShowBurgerModal] = useState(false);
  return (
    <div className={styles.main}>
      <LoginModal
        showModal={showLogModal}
        setShowModal={setShowLogModal}
        message={"Login for full experience!"}
      />
      <BurgerModal
        setShowLogModal={setShowLogModal}
        showBurgerModal={showBurgerModal}
        setShowBurgerModal={setShowBurgerModal}
      />
      <LogoComponent />
      <button
        onClick={() => setShowBurgerModal(!showBurgerModal)}
        className={styles.burgerBtn}
      >
        <img src={burger.src} alt="burger" />
      </button>
      <div className={styles.linksAndRegion}>
        <HeaderLinks setShowLogModal={setShowLogModal} />
        <RegionSelect />
      </div>
    </div>
  );
};
export default Header;
