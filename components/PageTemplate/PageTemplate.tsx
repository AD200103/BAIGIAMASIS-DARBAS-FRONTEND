import styles from "./styles.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { ReactNode } from "react";
type PageTemplateType = {
  children: ReactNode;
};
const PageTemplate = ({ children }: PageTemplateType) => {
  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
};
export default PageTemplate;
