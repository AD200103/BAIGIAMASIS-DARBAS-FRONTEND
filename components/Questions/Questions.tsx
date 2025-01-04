import styles from "./styles.module.css";
import QuestionCard from "../QuestionCard/QuestionCard";
import { QuestionType } from "@/types";
type QuestionPropsType = {
  questions: QuestionType[];
};
const Questions = ({ questions }: QuestionPropsType) => {
  return (
    <div className={styles.main}>
      {questions.map((q) => (
        <QuestionCard
          key={q.id}
          email={q.email}
          date={q.date}
          id={q.id}
          title={q.title}
          question={q.question_text}
        />
      ))}
    </div>
  );
};
export default Questions;