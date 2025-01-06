import Link from "next/link";
import styles from "./styles.module.css";
import { dateConvert } from "@/utils/dateAndEmail";
type QuestionCardPropsType = {
  email: string;
  id: string;
  question: string;
  date: Date;
  title: string;
  name: string;
};
const QuestionCard = ({
  id,
  question,
  date,
  title,
  name,
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
    </div>
  );
};
export default QuestionCard;
