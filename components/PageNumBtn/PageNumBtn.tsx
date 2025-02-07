/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
type PageNumBtnPropsType = {
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  pageNum: number;
  index: number;
  pageNumArr: number[];
  setSliceEnd: React.Dispatch<React.SetStateAction<number>>;
  setSliceStart: React.Dispatch<React.SetStateAction<number>>;
  sliceEnd: number;
  sliceStart: number;
};
const PageNumBtn = ({
  setPageNum,
  pageNum,
  index,
  setSliceEnd,
  setSliceStart,
  pageNumArr,
}: PageNumBtnPropsType) => {
  //--------------------------------------------
  const [sliceInTheActiveStart, setSliceInTheActiveStart] = useState(3);
  const [sliceInTheActiveEnd, setSliceInTheActiveEnd] = useState(2);
  const [arrEndNum, setArrEndNum] = useState(5);

  useEffect(() => {
    const checkScreenWidth = () => {
      if (window.innerWidth <= 768) {
        setSliceInTheActiveStart(2);
        setSliceInTheActiveEnd(1);
        setArrEndNum(3);
      } else {
        setSliceInTheActiveStart(3);
        setSliceInTheActiveEnd(2);
        setArrEndNum(5);
      }
    };
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, [
    window.innerWidth,
    arrEndNum,
    sliceInTheActiveStart,
    sliceInTheActiveEnd,
  ]);
  //--------------------------------------------
  console.log(arrEndNum);

  return (
    <div
      className={`${styles.main} ${pageNum == index && styles.btnActive}`}
      onClick={() => {
        const pageNumber = index + 1;
        if (pageNumArr.length >= 5) {
          if (pageNumber <= 2) {
            setSliceStart(0);
            setSliceEnd(arrEndNum);
          }
          if (pageNumber > 2 && pageNumber < pageNumArr.length - 1) {
            setSliceStart(pageNumber - sliceInTheActiveStart);
            setSliceEnd(pageNumber + sliceInTheActiveEnd);
          }
          if (pageNumber > pageNumArr.length - 1) {
            setSliceStart(pageNumArr.length - arrEndNum);
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
