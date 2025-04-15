/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
type SelectPageNumPropType = {
  setQuestionsPerPage: React.Dispatch<React.SetStateAction<number>>;
  questionsPerPage: number;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  pageNumArr: number[];
  setSliceStart: React.Dispatch<React.SetStateAction<number>>;
  setSliceEnd: React.Dispatch<React.SetStateAction<number>>;
};
const SelectPageNum = ({
  setQuestionsPerPage,
  questionsPerPage,
  setPageNum,
  pageNumArr,
  setSliceStart,
  setSliceEnd,
}: SelectPageNumPropType) => {
  const { t } = useTranslation();

  const [currentPageVal, setCurrentPageVal] = useState(0);

  useEffect(() => {
    if (parseInt(localStorage.getItem("pageNumber")!) > pageNumArr.length) {
      localStorage.setItem("pageNumber", pageNumArr.length.toString());
      setPageNum(pageNumArr.length - 1);
      return;
    }
  }, [currentPageVal, pageNumArr.length]);

  useEffect(() => {
    localStorage.setItem("pgNumArrLngth", pageNumArr.length.toString());
  }, [pageNumArr]);

  return (
    <div className={styles.dropdownNumContainer}>
      <p>{t("QuestionsPerPage")}:</p>
      <select
        className={styles.main}
        onChange={(e) => {
          sessionStorage.setItem("questionPerPage", e.target.value);
          localStorage.setItem("pgNumArrLngth", pageNumArr.length.toString());
          setCurrentPageVal(parseInt(e.target.value));
          setQuestionsPerPage(parseInt(e.target.value));
          setSliceStart(0);
          setSliceEnd(5);
        }}
      >
        <option>{questionsPerPage}</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="40">40</option>
        <option value="60">60</option>
      </select>
    </div>
  );
};
export default SelectPageNum;
