import styles from "./styles.module.css";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import HeaderLinks from "../HeaderLinks/HeaderLinks";

const Header = () => {
  const [showLogModal, setShowLogModal] = useState(false);
  return (
    <div className={styles.main}>
      <h1>AskOverload</h1>
      <HeaderLinks setShowLogModal={setShowLogModal} />
      <LoginModal
        showModal={showLogModal}
        setShowModal={setShowLogModal}
        message={"Login for full experience!"}
      />
    </div>
  );
};
export default Header;
