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
