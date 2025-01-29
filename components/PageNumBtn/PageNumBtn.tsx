import React from "react";
import styles from "./styles.module.css";
type PageNumBtnPropsType = {
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  pageNum: number;
  index: number;
};
const PageNumBtn = ({ setPageNum, pageNum, index }: PageNumBtnPropsType) => {
  return (
    <div
      className={`${styles.main} ${pageNum == index && styles.btnActive}`}
      onClick={() => {
        setPageNum(index);
      }}
    >
      {index + 1}
    </div>
  );
};
export default PageNumBtn;
