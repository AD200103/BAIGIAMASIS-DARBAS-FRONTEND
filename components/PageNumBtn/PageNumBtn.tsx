import React from "react";
import styles from "./styles.module.css";
type PageNumBtnPropsType = {
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  pageNum: number;
  index: number;
  pageNumArr: number[];
  setSliceEnd: React.Dispatch<React.SetStateAction<number>>;
  setSliceStart: React.Dispatch<React.SetStateAction<number>>;
};
const PageNumBtn = ({
  setPageNum,
  pageNum,
  index,
  setSliceEnd,
  setSliceStart,
  pageNumArr,
}: PageNumBtnPropsType) => {
  return (
    <div
      className={`${styles.main} ${pageNum == index && styles.btnActive}`}
      onClick={() => {
        const pageNumber = index + 1;
        if (pageNumArr.length >= 5) {
          if (pageNumber <= 2) {
            setSliceStart(0);
            setSliceEnd(5);
          }
          if (pageNumber > 2 && pageNumber < pageNumArr.length - 1) {
            setSliceStart(pageNumber - 3);
            setSliceEnd(pageNumber + 2);
          }
          if (pageNumber > pageNumArr.length - 1) {
            setSliceStart(pageNumArr.length - 5);
            setSliceEnd(pageNumArr.length);
          }
        } else {
          setSliceStart(0);
          setSliceEnd(pageNumArr.length);
        }
        setPageNum(index);
      }}
    >
      {index + 1}
    </div>
  );
};
export default PageNumBtn;
