import styles from "./styles.module.css";
import QuestionCard from "../QuestionCard/QuestionCard";
import { QuestionType } from "@/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
type QuestionsPropsType = {
  questions: QuestionType[];
};
const Questions = ({
  questions,
  region,
}: QuestionsPropsType & { region: string }) => {
  const [sortVal, setSortVal] = useState("All");
  const { t } = useTranslation();
  return (
    <div className={styles.main}>
      <h1>{t("questions")}</h1>
      <div className={styles.dropdownContainer}>
        <p>{t("SortQuestionsBy")}:</p>
        <select
          className={styles.dropdown}
          onChange={(e) => setSortVal(e.target.value)}
        >
          <option value="All">{t("All")}</option>
          <option value="Answered">{t("Answered")}</option>
          <option value="Unanswered">{t("Unanswered")}</option>
        </select>
      </div>
      {questions
        .filter(
          (a) =>
            (sortVal == "All" && a.answers >= 0) ||
            (sortVal == "Answered" && a.answers !== 0) ||
            (sortVal == "Unanswered" && a.answers == 0)
        )
        .map((q) => (
          <QuestionCard key={q.id} {...q} region={region} />
        ))}
    </div>
  );
};
export default Questions;
