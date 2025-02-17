import React from "react";
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
  pageNum,
  setPageNum,
  pageNumArr,
  setSliceStart,
  setSliceEnd,
}: SelectPageNumPropType) => {
  const { t } = useTranslation();
  return (
    <div className={styles.dropdownNumContainer}>
      <p>{t("QuestionsPerPage")}:</p>
      <select
        className={styles.main}
        onChange={(e) => {
          sessionStorage.setItem("questionPerPage", e.target.value);
          setQuestionsPerPage(parseInt(e.target.value));
          setSliceStart(0);
          setSliceEnd(5);
          const ratio = pageNumArr.length / parseInt(e.target.value);
          console.log({
            ratio: ratio,
            ratioCeiled: Math.ceil(ratio),
            ratioRounded: Math.round(ratio),
            pageNum: pageNum,
          });
          if (pageNum >= Math.ceil(ratio)) {
            if (ratio >= 1) {
              setPageNum(Math.ceil(ratio));
            }
            if (ratio < 1) {
              setPageNum(Math.round(ratio));
            }
          }
        }}
      >
        <option>{questionsPerPage}</option>
        <option value="2">2</option>
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
