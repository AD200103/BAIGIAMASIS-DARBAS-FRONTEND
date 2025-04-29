import { useTranslation } from "react-i18next";
import styles from "./styles.module.css";
import { AxiosError } from "axios";
import { deleteAnswer } from "@/api/answer";
import cookie from "js-cookie";
import { AnsCardDelBtnType } from "@/types";

const AnsCardDelBtn = ({
  answer_text,
  userIdFromToken,
  userId,
  setLoaderVis,
  setAnswers,
  setMessage,
  setShowLogModal,
  id,
}: AnsCardDelBtnType) => {
  const { t } = useTranslation();
  const deleteAnAnswer = async () => {
    const token = cookie.get("jwt-token") as string;
    if (token) {
      setLoaderVis(true);
    }
    try {
      const response = await deleteAnswer(id, token);
      if (response.status == 200) {
        setLoaderVis(false);
        setAnswers((prev) => prev!.filter((a) => a.id !== id));
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.status == 403) {
        setLoaderVis(false);
        setMessage(t("LoginToDeleteYourAnswer"));
        setShowLogModal(true);
      }
    }
  };
  return (
    <div className={styles.ansAndDelBtn}>
      <p className={styles.ansText}>
        {t("Answer")} {answer_text}
      </p>
      {userIdFromToken == userId && (
        <p className={styles.delBtn} onClick={deleteAnAnswer}>
          {t("Delete")}
        </p>
      )}
    </div>
  );
};
export default AnsCardDelBtn;
