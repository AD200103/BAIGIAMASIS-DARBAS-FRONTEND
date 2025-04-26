import React from "react";
type funcProps = {
  pageNumArr: number[];
  setSliceStart: React.Dispatch<React.SetStateAction<number>>;
  setSliceEnd: React.Dispatch<React.SetStateAction<number>>;
  num1: number;
  num2: number;
  num3: number;
};
type callFuncProps = Omit<funcProps, "num1" | "num2" | "num3">;
const pageNumberArrLengthChange = ({
  pageNumArr,
  setSliceStart,
  setSliceEnd,
  num1,
  num2,
  num3,
}: funcProps) => {
  const pageNumber = parseInt(sessionStorage.getItem("pageNumber") || "1");
  if (pageNumArr.length >= num1) {
    if (pageNumber <= 2) {
      setSliceStart(0);
      setSliceEnd(num1);
    }
    if (pageNumber > 2 && pageNumber < pageNumArr.length - 1) {
      setSliceStart(pageNumber - num2);
      setSliceEnd(pageNumber + num3);
    }
    if (pageNumber >= pageNumArr.length - 1) {
      setSliceStart(pageNumArr.length - num1);
      setSliceEnd(pageNumArr.length);
    }
  } else {
    setSliceStart(0);
    setSliceEnd(pageNumArr.length);
  }
};

export const callPageNumArrChang = ({
  pageNumArr,
  setSliceStart,
  setSliceEnd,
}: callFuncProps) => {
  if (window.innerWidth > 768) {
    pageNumberArrLengthChange({
      pageNumArr,
      setSliceStart,
      setSliceEnd,
      num1: 5,
      num2: 3,
      num3: 2,
    });
  }
  if (window.innerWidth <= 768) {
    pageNumberArrLengthChange({
      pageNumArr,
      setSliceStart,
      setSliceEnd,
      num1: 3,
      num2: 2,
      num3: 1,
    });
  }
};
