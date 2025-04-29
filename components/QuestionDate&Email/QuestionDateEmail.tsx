import { useTranslation } from "react-i18next";
import styles from "./styles.module.css";
import { QuestionType } from "@/types";
import { dateConvert } from "@/utils/dateAndEmail";
type QuestionDateEmailPropsType = {
  question: QuestionType;
  userIdFromToken: string | undefined;
  region: string;
};
const QuestionDateEmail = ({
  question,
  userIdFromToken,
  region,
}: QuestionDateEmailPropsType) => {
  const { t } = useTranslation();
  return (
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
  );
};
export default QuestionDateEmail;
