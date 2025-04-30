import React from "react";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
type SortQuestionByPropsType = {
  setSortVal: React.Dispatch<React.SetStateAction<string>>;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
};
const SortQuestionsBy = ({
  setSortVal,
  setPageNum,
}: SortQuestionByPropsType) => {
  const { t } = useTranslation();
  return (
    <div className={styles.dropdownContainer}>
      <p>{t("SortQuestionsBy")}:</p>
      <select
        className={styles.dropdown}
        onChange={(e) => {
          setSortVal(e.target.value);
          sessionStorage.setItem("SortBy", e.target.value);
          sessionStorage.setItem("pageNumber", "1");
          setPageNum(0);
        }}
      >
        <option> {t(sessionStorage.getItem("SortBy") || "All")}</option>
        <option value="All">{t("All")}</option>
        <option value="Answered">{t("Answered")}</option>
        <option value="Unanswered">{t("Unanswered")}</option>
      </select>
    </div>
  );
};
export default SortQuestionsBy;
