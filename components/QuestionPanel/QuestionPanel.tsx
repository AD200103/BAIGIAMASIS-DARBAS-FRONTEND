import styles from "./styles.module.css";
import { dateConvert } from "@/utils/dateAndEmail";
import { SetStateAction } from "react";
import { QuestionType } from "@/types";
import { useTranslation } from "react-i18next";
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
      <div className={styles.dateEmailBox}>
        <p>
          {t("PostedBy")}{" "}
          {question.user_id == userIdFromToken ? (
            <span className={styles.youStyle}>{t("You")}</span>
          ) : (
            <span className={styles.youUsername}>{question?.name}</span>
          )}
        </p>
        <p>
          {t("time")}: {dateConvert(question?.date, region)}
        </p>
      </div>
    </div>
  );
};
export default QuestionPanel;
