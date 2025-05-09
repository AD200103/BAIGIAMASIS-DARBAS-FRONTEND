import styles from "./styles.module.css";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { deleteQuestion } from "@/api/question";
import { AxiosError } from "axios";
import Loader from "../Loader/Loader";
import { useTranslation } from "react-i18next";
type DeleteQuestionModalPropsType = {
  id: string;
  setShowQustionDelModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};
const DeleteQuestionModal = ({
  id,
  setShowQustionDelModal,
  setShowModal,
  setMessage,
}: DeleteQuestionModalPropsType) => {
  const router = useRouter();
  const [loaderVis, setLoaderVis] = useState(false);
  const { t } = useTranslation();
  const deleteAQuestion = async () => {
    try {
      const token = cookie.get("jwt-token") as string;
      if (token) {
        setLoaderVis(true);
      }
      const response = await deleteQuestion(token, id);
      if (response.status == 200) {
        router.push("/");
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      setLoaderVis(false);
      if (error.status == 403) {
        setShowQustionDelModal(false);
        setMessage("Login to delete your question!");
        setShowModal(true);
      }
    }
  };
  return (
    <div className={styles.main}>
      {loaderVis && <Loader />}
      <div className={styles.panel}>
        <h1>{t("DelQuestion")}</h1>
        <div className={styles.buttons}>
          <button onClick={deleteAQuestion}>{t("Yes")}</button>
          <button onClick={() => setShowQustionDelModal(false)}>
            {t("No")}
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteQuestionModal;
