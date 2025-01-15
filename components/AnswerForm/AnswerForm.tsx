import styles from "./styles.module.css";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import cookie from "js-cookie";
import { AnswerType } from "@/types";
type AnwerFormPropsType = {
  setNewAnswer: React.Dispatch<React.SetStateAction<AnswerType | null>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string | undefined;
};
const AnswerForm = ({
  setNewAnswer,
  setMessage,
  setShowModal,
  id,
}: AnwerFormPropsType) => {
  const [answerText, setAnswerText] = useState("");

  const addAnswer = async () => {
    try {
      const body = {
        answer_text: answerText,
      };
      const headers = {
        authorization: cookie.get("jwt-token"),
      };
      const response = await axios.post(
        `http://localhost:3002/question/${id}/answers`,
        body,
        { headers }
      );
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
          addAnswer();
        }}
      >
        Add answer
      </button>
    </div>
  );
};
export default AnswerForm;
