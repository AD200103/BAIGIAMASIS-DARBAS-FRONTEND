import Link from "next/link";
import styles from "./styles.module.css";
type QuestionCardPropsType = {
  email: string;
  id: string;
  question: string;
  date: Date;
  title: string;
};
const QuestionCard = ({
  email,
  id,
  question,
  date,
  title,
}: QuestionCardPropsType) => {
  const dateFixed = date
    .toString()
    .replace(/[TZ]/g, " ")
    .slice(0, date.toString().length - 5);
  const emailfixed = email.replace("gmail.com", "");
  return (
    <div className={styles.main}>
      <Link href={`/question/${id}`}>
        <h2>{title}</h2>
      </Link>
      <p>{question}</p>
      <h4>
        Posted by: <span>{emailfixed}</span> <br />
        At UTC+00: {dateFixed}
      </h4>
    </div>
  );
};
export default QuestionCard;
