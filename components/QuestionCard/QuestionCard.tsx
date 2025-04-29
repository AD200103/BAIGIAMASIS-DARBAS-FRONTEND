import Link from "next/link";
import styles from "./styles.module.css";
import { decodeToken } from "@/utils/jwtTokenDecoded";
import { useTranslation } from "react-i18next";
import QCardPostedBy from "../QuestionCardPostedBy/QuestionCardPostedBy";

import cookie from "js-cookie";
type QuestionCardPropsType = {
  id: string;
  question_text: string;
  date: Date;
  title: string;
  name: string;
  answers: number;
  user_id: string;
  region: string;
};

const QuestionCard = ({
  id,
  question_text,
  date,
  title,
  name,
  answers,
  user_id,
  region,
}: QuestionCardPropsType) => {
  const token = cookie.get("jwt-token");
  const userIdFromToken: string | undefined = token
    ? decodeToken(token!)?.id
    : undefined;
  const { t } = useTranslation();
  return (
    <div className={styles.main}>
      <Link href={`/question/${id}`}>
        <h2>{title}</h2>
      </Link>
      <p>{question_text}</p>
      <QCardPostedBy
        userIdFromToken={userIdFromToken}
        user_id={user_id}
        name={name}
        date={date}
        region={region}
      />
      <p>
        {t("Answers")}: {answers}
      </p>
    </div>
  );
};
export default QuestionCard;
