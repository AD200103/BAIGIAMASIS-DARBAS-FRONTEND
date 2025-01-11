import styles from "./styles.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { ReactNode } from "react";
type PageTemplateType = {
  children: ReactNode;
  getToken: string;
  logOut: () => void;
};

const PageTemplate = ({ children, getToken, logOut }: PageTemplateType) => {
  return (
    <div className={styles.main}>
      <Header getToken={getToken} logOut={logOut} />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
};
export default PageTemplate;
