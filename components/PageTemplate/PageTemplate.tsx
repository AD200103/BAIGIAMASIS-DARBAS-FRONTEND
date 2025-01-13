import styles from "./styles.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import { useState } from "react";
import { ReactNode } from "react";
type PageTemplateType = {
  children: ReactNode;
};

const PageTemplate = ({ children }: PageTemplateType) => {
  const [showLogModal, setShowLogModal] = useState(false);
  return (
    <div className={styles.main}>
      <Header showLogModal={showLogModal} setShowLogModal={setShowLogModal} />
      <div className={styles.content}>{children}</div>
      <Footer />
      {showLogModal && <LoginModal />}
    </div>
  );
};
export default PageTemplate;
