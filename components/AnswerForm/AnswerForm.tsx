import styles from "./styles.module.css";
import React, { useState } from "react";
import { AxiosError } from "axios";
import cookie from "js-cookie";
import { AnswerType } from "@/types";
import { addAnswer } from "@/api/answer";
type AnwerFormPropsType = {
  setNewAnswer: React.Dispatch<React.SetStateAction<AnswerType | null>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};
const AnswerForm = ({
  setNewAnswer,
  setMessage,
  setShowModal,
  id,
}: AnwerFormPropsType) => {
  const [answerText, setAnswerText] = useState("");

  const addAnAnswer = async () => {
    try {
      const body = {
        answer_text: answerText,
      };
      const token = cookie.get("jwt-token") as string;
      const response = await addAnswer(token, body, id);
      if (response.status == 201) {
        setNewAnswer(response.data.answer);
        setAnswerText("");
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error.status == 403) {
        setMessage("Login to answer!");
        setShowModal(true);
      }
    }
  };
  return (
    <div className={styles.answerForm}>
      <textarea
        value={answerText}
        maxLength={900}
        placeholder="Your answer..."
        onChange={(e) => setAnswerText(e.target.value)}
      ></textarea>
      <button
        onClick={() => {
          addAnAnswer();
        }}
      >
        Add answer
      </button>
    </div>
  );
};
export default AnswerForm;
