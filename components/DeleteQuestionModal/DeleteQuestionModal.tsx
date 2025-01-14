import styles from "./styles.module.css";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { deleteQuestion } from "@/api/question";
import { AxiosError } from "axios";
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
  const deleteAQuestion = async () => {
    try {
      const token = cookie.get("jwt-token") as string;
      const response = await deleteQuestion(token, id);
      if (response.status == 200) {
        router.push("/");
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error.status == 403) {
        setShowQustionDelModal(false);
        setMessage("Login to delete your question!");
        setShowModal(true);
      }
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.panel}>
        <h1>Are you sure you want to delete this question?</h1>
        <button onClick={deleteAQuestion}>Yes</button>
        <button onClick={() => setShowQustionDelModal(false)}>No</button>
      </div>
    </div>
  );
};
export default DeleteQuestionModal;
