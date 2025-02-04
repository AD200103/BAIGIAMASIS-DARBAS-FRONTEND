import React from "react";
import styles from "./styles.module.css";
type PageNumBtnPropsType = {
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  pageNum: number;
  index: number;
  pageNumArr: number[];
};
const PageNumBtn = ({
  setPageNum,
  pageNum,
  index,
}: // pageNumArr,
PageNumBtnPropsType) => {
  return (
    <div
      className={`${styles.main} ${pageNum == index && styles.btnActive} 
      `}
      onClick={() => {
        setPageNum(index);
      }}
    >
      {index + 1}
    </div>
  );
};
export default PageNumBtn;
// ${
//   // pageNum !== 0 &&
//   // pageNum !== 1 &&
//   // pageNum !== pageNumArr.length - 1 &&
//   // pageNum !== pageNumArr.length - 2 &&
//   // pageNum !== index &&
//   // pageNum !== index - 1 &&
//   // pageNum !== index + 1 &&
//   // pageNum !== index - 2 &&
//   // pageNum !== index + 2
//   //   ? styles.btnDissapear
//   //   : styles.main
// }
