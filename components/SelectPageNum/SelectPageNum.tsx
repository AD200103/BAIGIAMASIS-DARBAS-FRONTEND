/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
import { callPageNumArrChang } from "@/utils/pageNumberArrLngthChange";
import setSliceRange from "@/utils/setSliceRange";
type SelectPageNumPropType = {
  setQuestionsPerPage: React.Dispatch<React.SetStateAction<number>>;
  questionsPerPage: number;
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
    if (parseInt(sessionStorage.getItem("pageNumber")!) > pageNumArr.length) {
      sessionStorage.setItem("pageNumber", pageNumArr.length.toString());
      setPageNum(pageNumArr.length - 1);
      return;
    }
  }, [currentPageVal, pageNumArr]);
  useEffect(() => {
    sessionStorage.setItem("pgNumArrLngth", pageNumArr.length.toString());
  }, [pageNumArr]);
  return (
    <div className={styles.dropdownNumContainer}>
      <p>{t("QuestionsPerPage")}:</p>
      <select
        className={styles.main}
        onChange={(e) => {
          sessionStorage.setItem("questionPerPage", e.target.value);
          sessionStorage.setItem("pgNumArrLngth", pageNumArr.length.toString());
          setCurrentPageVal(parseInt(e.target.value));
          setQuestionsPerPage(parseInt(e.target.value));
          setSliceRange({ setSliceStart, setSliceEnd });
          callPageNumArrChang({ pageNumArr, setSliceStart, setSliceEnd });
          setPageNum(0);
        }}
      >
        <option>{questionsPerPage}</option>
        {[2, 3, 5, 10, 20, 40, 60].map((n) => (
          <option key={n} value={n.toString()}>
            {n}
          </option>
        ))}
      </select>
    </div>
  );
};
export default SelectPageNum;
