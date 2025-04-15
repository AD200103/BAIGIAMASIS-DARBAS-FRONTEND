import styles from "./styles.module.css";
import PageNumBtn from "../PageNumBtn/PageNumBtn";
import React from "react";

type PageNumBtnArrProps = {
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  pageNumArr: null | number[];
  sliceEnd: number;
  setSliceEnd: React.Dispatch<React.SetStateAction<number>>;
  sliceStart: number;
  setSliceStart: React.Dispatch<React.SetStateAction<number>>;
};
const PageNumBtnArr = ({
  pageNum,
  setPageNum,
  pageNumArr,
  sliceEnd,
  setSliceEnd,
  sliceStart,
  setSliceStart,
}: PageNumBtnArrProps) => {
  return (
    <div className={styles.main}>
      <div tabIndex={0} className={styles.pageNumberContainer}>
        {pageNumArr &&
          pageNumArr
            .map((num, index) => (
              <PageNumBtn
                key={index}
                setPageNum={setPageNum}
                pageNum={pageNum}
                index={index}
                pageNumArr={pageNumArr}
                setSliceEnd={setSliceEnd}
                setSliceStart={setSliceStart}
                sliceEnd={sliceEnd}
                sliceStart={sliceStart}
              />
            ))
            .slice(sliceStart, sliceEnd)}
      </div>
    </div>
  );
};
export default PageNumBtnArr;
