import styles from "./styles.module.css";
import { SetStateAction } from "react";
import { QuestionType } from "@/types";
import { useTranslation } from "react-i18next";
import QuestionDateEmail from "../QuestionDate&Email/QuestionDateEmail";
type QuestionPanelPropsType = {
  question: QuestionType;
  userIdFromToken: string | undefined;
  setShowQustionDelModal: React.Dispatch<SetStateAction<boolean>>;
  region: string;
};
const QuestionPanel = ({
  question,
  userIdFromToken,
  setShowQustionDelModal,
  region,
}: QuestionPanelPropsType) => {
  const { t } = useTranslation();
  return (
    <div className={styles.main}>
      <h1>{question.title}</h1>
      <p>{question.question_text}</p>
      {question.user_id == userIdFromToken && (
        <p
          className={styles.delBtn}
          onClick={() => setShowQustionDelModal(true)}
        >
          {t("Delete")}
        </p>
      )}
      <QuestionDateEmail
        question={question}
        userIdFromToken={userIdFromToken}
        region={region}
      />
    </div>
  );
};
export default QuestionPanel;
