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
  const [prevWidth, setPrevWidth] = useState(window.innerWidth);
  const [widthChangeDetection, setWidthChangeDetection] = useState(
    window.innerWidth
  );

  const checkScreenWidth = () => {
    const pageNumber = parseInt(localStorage.getItem("pageNumber") || "1");
    if (window.innerWidth > 768) {
      if (pageNumArr.length >= 5) {
        if (pageNumber <= 2) {
          setSliceStart(0);
          setSliceEnd(5);
        }
        if (pageNumber > 2 && pageNumber < pageNumArr.length - 1) {
          setSliceStart(pageNumber - 3);
          setSliceEnd(pageNumber + 2);
        }
        if (pageNumber >= pageNumArr.length - 1) {
          setSliceStart(pageNumArr.length - 5);
          setSliceEnd(pageNumArr.length);
        }
      } else {
        setSliceStart(0);
        setSliceEnd(pageNumArr.length);
      }
    }
    if (window.innerWidth <= 768) {
      if (pageNumArr.length >= 5) {
        if (pageNumber <= 2) {
          setSliceStart(0);
          setSliceEnd(3);
        }
        if (pageNumber > 2 && pageNumber < pageNumArr.length - 1) {
          setSliceStart(pageNumber - 2);
          setSliceEnd(pageNumber + 1);
        }
        if (pageNumber >= pageNumArr.length - 1) {
          setSliceStart(pageNumArr.length - 3);
          setSliceEnd(pageNumArr.length);
        }
      } else {
        setSliceStart(0);
        setSliceEnd(pageNumArr.length);
      }
    }
  };

  useEffect(() => {
    const checkingScreenWidth = () => {
      setPrevWidth(widthChangeDetection);
      setWidthChangeDetection(window.innerWidth);
    };
    window.addEventListener("resize", checkingScreenWidth);
    return () => window.removeEventListener("resize", checkingScreenWidth);
  }, [widthChangeDetection]);

  useEffect(() => {
    if (
      (prevWidth > 768 && widthChangeDetection <= 768) ||
      (prevWidth <= 768 && widthChangeDetection > 768)
    ) {
      checkScreenWidth();
    }
  }, [widthChangeDetection, prevWidth]);
  //--------------------------------------------

  return (
    <div
      className={`${styles.main} ${pageNum == index && styles.btnActive}`}
      onClick={() => {
        localStorage.setItem("pageNumber", (index + 1).toString());
        checkScreenWidth();
        setPageNum(index);
      }}
    >
      {index + 1}
    </div>
  );
};
export default PageNumBtn;
