import styles from "./styles.module.css";
import QuestionCard from "../QuestionCard/QuestionCard";
import { QuestionType } from "@/types";
import { useState } from "react";
type QuestionPropsType = {
  questions: QuestionType[];
};
const Questions = ({ questions }: QuestionPropsType) => {
  const [sortVal, setSortVal] = useState("All");

  return (
    <div className={styles.main}>
      <select onChange={(e) => setSortVal(e.target.value)}>
        <option value="All">All</option>
        <option value="Answered">Answered</option>
        <option value="Unanswered">Unanswered</option>
      </select>
      {questions
        .filter(
          (a) =>
            (sortVal == "All" && a.answers >= 0) ||
            (sortVal == "Answered" && a.answers !== 0) ||
            (sortVal == "Unanswered" && a.answers == 0)
        )
        .map((q) => (
          <QuestionCard
            key={q.id}
            date={q.date}
            id={q.id}
            title={q.title}
            name={q.name}
            question={q.question_text}
            answerNumber={q.answers}
          />
        ))}
    </div>
  );
};
export default Questions;
