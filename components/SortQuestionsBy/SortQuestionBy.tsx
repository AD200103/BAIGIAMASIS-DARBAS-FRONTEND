import React from "react";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
import { gettingQuestions } from "@/api/question";
import { QuestionType } from "@/types";
import { formArr } from "@/utils/formArray";
type SortQuestionByPropsType = {
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[] | []>>;
  pageNum: number;
  setPageNumArr: React.Dispatch<React.SetStateAction<number[] | null>>;
  setSortVal: React.Dispatch<React.SetStateAction<string>>;
  setLoaderVis: React.Dispatch<React.SetStateAction<boolean>>;
};
const SortQuestionsBy = ({
  setSortVal,
  setQuestions,
  pageNum,
  setPageNumArr,
  setLoaderVis,
}: SortQuestionByPropsType) => {
  const getQuestions = async (sortVal: string) => {
    try {
      setLoaderVis(true);
      const questionPerPage = parseInt(
        sessionStorage.getItem("questionPerPage") || "2"
      );
      const response = await gettingQuestions(
        pageNum,
        questionPerPage,
        sortVal
      );
      if (response.status == 200) {
        setLoaderVis(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setQuestions(response.data.questions);
        setPageNumArr(formArr(response, questionPerPage));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { t } = useTranslation();
  return (
    <div className={styles.dropdownContainer}>
      <p>{t("SortQuestionsBy")}:</p>
      <select
        className={styles.dropdown}
        onChange={(e) => {
          getQuestions(e.target.value);
          setSortVal(e.target.value);
          sessionStorage.setItem("SortBy", e.target.value);
          sessionStorage.setItem("pageNumber", "1");
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
