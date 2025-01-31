import React from "react";
import styles from "./styles.module.css";
type PageNumBtnPropsType = {
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  pageNum: number;
  index: number;
  pageNumArr: number[];
};
const PageNumBtn = ({ setPageNum, pageNum, index }: PageNumBtnPropsType) => {
  return (
    <div
      className={`${styles.main} ${pageNum == index && styles.btnActive} ${
        pageNum !== 0 &&
        pageNum !== 1 &&
        pageNum !== index &&
        pageNum !== index - 1 &&
        pageNum !== index + 1 &&
        pageNum !== index - 2 &&
        pageNum !== index + 2
          ? styles.btnDissapear
          : styles.main
      }`}
      onClick={() => {
        setPageNum(index);
      }}
    >
      {index + 1}
    </div>
  );
};
export default PageNumBtn;
