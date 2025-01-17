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
      <h1>Questions</h1>
      <div className={styles.dropdownContainer}>
        <p>Sort questions by:</p>
        <select
          className={styles.dropdown}
          onChange={(e) => setSortVal(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Answered">Answered</option>
          <option value="Unanswered">Unanswered</option>
        </select>
      </div>
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
