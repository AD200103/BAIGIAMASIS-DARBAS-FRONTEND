import styles from "./styles.module.css";
import QuestionCard from "../QuestionCard/QuestionCard";
import { QuestionType } from "@/types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SelectPageNum from "../SelectPageNum/SelectPageNum";
import SortQuestionsBy from "../SortQuestionsBy/SortQuestionBy";
type QuestionsPropsType = {
  questions: QuestionType[];
  setQuestionsPerPage: React.Dispatch<React.SetStateAction<number>>;
  questionsPerPage: number;
};
const Questions = ({
  questions,
  region,
  setQuestionsPerPage,
  questionsPerPage,
}: QuestionsPropsType & { region: string }) => {
  const [sortVal, setSortVal] = useState("All");
  const { t } = useTranslation();
  return (
    <div className={styles.main}>
      <h1>{t("questions")}</h1>
      <SortQuestionsBy setSortVal={setSortVal} />
      <SelectPageNum
        setQuestionsPerPage={setQuestionsPerPage}
        questionsPerPage={questionsPerPage}
      />
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
