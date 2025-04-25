/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { callPageNumArrChang } from "@/utils/pageNumberArrLngthChange";
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
  const [prevWidth, setPrevWidth] = useState(window.innerWidth);
  const [widthChangeDetection, setWidthChangeDetection] = useState(
    window.innerWidth
  );

  useEffect(() => {
    const checkingScreenWidth = () => {
      setPrevWidth(widthChangeDetection);
      setWidthChangeDetection(window.innerWidth);
    };
    window.addEventListener("resize", checkingScreenWidth);
    if (
      (prevWidth > 768 && widthChangeDetection <= 768) ||
      (prevWidth <= 768 && widthChangeDetection > 768)
    ) {
      callPageNumArrChang({ pageNumArr, setSliceStart, setSliceEnd });
    }
    return () => window.removeEventListener("resize", checkingScreenWidth);
  }, [widthChangeDetection, prevWidth]);

  return (
    <div
      className={`${styles.main} ${pageNum == index && styles.btnActive}`}
      onClick={() => {
        sessionStorage.setItem("pageNumber", (index + 1).toString());
        callPageNumArrChang({ pageNumArr, setSliceStart, setSliceEnd });
        setPageNum(index);
      }}
    >
      {index + 1}
    </div>
  );
};
export default PageNumBtn;
