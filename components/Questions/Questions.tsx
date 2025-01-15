import styles from "./styles.module.css";
import QuestionCard from "../QuestionCard/QuestionCard";
import { QuestionType } from "@/types";
import { useState } from "react";
type QuestionsPropsType = {
  questions: QuestionType[];
};
const Questions = ({ questions }: QuestionsPropsType) => {
  const [sortVal, setSortVal] = useState("All");

  return (
    <div className={styles.main}>
      <select onChange={(e) => setSortVal(e.target.value)}>
        <option value="All">All</option>
        <option value="Answered">Answered</option>
        <option value="Unanswered">Unanswered</option>
      </select>
      {questions
        .sort((a, b) => b.date.toString().localeCompare(a.date.toString()))
        .filter(
          (a) =>
            (sortVal == "All" && a.answers >= 0) ||
            (sortVal == "Answered" && a.answers !== 0) ||
            (sortVal == "Unanswered" && a.answers == 0)
        )
        .map((q) => (
          <QuestionCard key={q.id} {...q} />
        ))}
    </div>
  );
};
export default Questions;
