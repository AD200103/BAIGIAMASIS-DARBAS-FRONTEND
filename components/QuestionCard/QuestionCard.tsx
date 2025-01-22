import Link from "next/link";
import styles from "./styles.module.css";
import { dateConvert } from "@/utils/dateAndEmail";
import { decodeToken } from "@/utils/jwtTokenDecoded";
import cookie from "js-cookie";
type QuestionCardPropsType = {
  id: string;
  question_text: string;
  date: Date;
  title: string;
  name: string;
  answers: number;
  user_id: string;
};

const QuestionCard = ({
  id,
  question_text,
  date,
  title,
  name,
  answers,
  user_id,
}: QuestionCardPropsType) => {
  const token = cookie.get("jwt-token");
  const userIdFromToken: string | undefined = decodeToken(token!);
  return (
    <div className={styles.main}>
      <Link href={`/question/${id}`}>
        <h2>{title}</h2>
      </Link>
      <p>{question_text}</p>
      <h4>
        <div className={styles.postedBy}>
          Posted by:{" "}
          {userIdFromToken !== user_id ? (
            <span className={styles.userClass}>{name}</span>
          ) : (
            <span className={styles.yClass}>You</span>
          )}{" "}
        </div>
        <>At: {dateConvert(date)}</>
      </h4>
      <p>Answers: {answers}</p>
    </div>
  );
};
export default QuestionCard;
