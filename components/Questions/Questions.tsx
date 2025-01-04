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
        <QuestionCard key={q.id} />
      ))}
    </div>
  );
};
export default Questions;
