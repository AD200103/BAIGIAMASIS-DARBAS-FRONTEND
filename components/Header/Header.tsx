/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.css";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import HeaderLinks from "../HeaderLinks/HeaderLinks";
import LogoComponent from "../LogoComponent/LogoComponent";
import burger from "../../assets/img/burger.svg";
import BurgerModal from "../BurgerModal/BurgerModal";
const Header = () => {
  const [showLogModal, setShowLogModal] = useState(false);
  const [showBurgerModal, setShowBurgerModal] = useState(false);
  return (
    <div className={styles.main}>
      <LogoComponent />
      <button
        onClick={() => setShowBurgerModal(!showBurgerModal)}
        className={styles.burgerBtn}
      >
        <img src={burger.src} alt="burger" />
      </button>
      <HeaderLinks setShowLogModal={setShowLogModal} />
      <LoginModal
        showModal={showLogModal}
        setShowModal={setShowLogModal}
        message={"Login for full experience!"}
      />
      <BurgerModal showBurgerModal={showBurgerModal} />
    </div>
  );
};
export default Header;
