import styles from "./styles.module.css";
import { dateConvert } from "@/utils/dateAndEmail";
import { SetStateAction } from "react";
import { QuestionType } from "@/types";
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
  return (
    <div className={styles.main}>
      <h1>{question.title}</h1>
      <p>{question.question_text}</p>
      {question.user_id == userIdFromToken && (
        <p
          className={styles.delBtn}
          onClick={() => setShowQustionDelModal(true)}
        >
          Delete
        </p>
      )}
      <div className={styles.dateEmailBox}>
        <p>
          Asked by:{" "}
          {question.user_id == userIdFromToken ? (
            <span className={styles.youStyle}>You</span>
          ) : (
            <span className={styles.youUsername}>{question?.name}</span>
          )}
        </p>
        <p>At: {dateConvert(question?.date, region)}</p>
      </div>
    </div>
  );
};
export default QuestionPanel;
