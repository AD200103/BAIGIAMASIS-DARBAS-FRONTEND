import Link from "next/link";
import styles from "./styles.module.css";
import { dateConvert } from "@/utils/dateAndEmail";
type QuestionCardPropsType = {
  id: string;
  question: string;
  date: Date;
  title: string;
  name: string;
  answerNumber: number;
};
const QuestionCard = ({
  id,
  question,
  date,
  title,
  name,
  answerNumber,
}: QuestionCardPropsType) => {
  return (
    <div className={styles.main}>
      <Link href={`/question/${id}`}>
        <h2>{title}</h2>
      </Link>
      <p>{question}</p>
      <h4>
        Posted by: <span>{name}</span> <br />
        At: {dateConvert(date)}, UTC+00
      </h4>
      <p>Answers: {answerNumber}</p>
    </div>
  );
};
export default QuestionCard;
