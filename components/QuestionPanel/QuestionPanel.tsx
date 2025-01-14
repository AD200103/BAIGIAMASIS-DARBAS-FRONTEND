import styles from "./styles.module.css";
import { dateConvert } from "@/utils/dateAndEmail";
import { SetStateAction } from "react";
import { QuestionType } from "@/types";
type QuestionPanelPropsType = {
  question: QuestionType;
  userIdFromToken: string | undefined;
  setShowQustionDelModal: React.Dispatch<SetStateAction<boolean>>;
};
const QuestionPanel = ({
  question,
  userIdFromToken,
  setShowQustionDelModal,
}: QuestionPanelPropsType) => {
  return (
    <div>
      <h1>{question.title}</h1>
      <p>{question.question_text}</p>
      {question.user_id == userIdFromToken && (
        <button onClick={() => setShowQustionDelModal(true)}>Delete</button>
      )}
      <div className={styles.dateEmailBox}>
        <p>
          Asked by:{" "}
          {question.user_id == userIdFromToken ? (
            <span>You</span>
          ) : (
            question?.name
          )}
        </p>
        <p>At: {dateConvert(question?.date)}, UTC+00</p>
      </div>
    </div>
  );
};
export default QuestionPanel;
