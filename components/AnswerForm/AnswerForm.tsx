import styles from "./styles.module.css";
import React, { useState } from "react";
import { AxiosError } from "axios";
import cookie from "js-cookie";
import { AnswerType } from "@/types";
import { addAnswer } from "@/api/answer";
import { inputValidation } from "@/utils/inputValidation";
import Loader from "../Loader/Loader";
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
  const [ansPlacholder, setAnsPLaceholder] = useState("Your answer...");
  const [redAnsAlert, setRedAnsAlert] = useState(false);
  const [loaderVis, setLoaderVis] = useState(false);
  const addAnAnswer = async () => {
    try {
      const body = {
        answer_text: answerText,
      };
      const token = cookie.get("jwt-token") as string;
      if (token) {
        setLoaderVis(true);
      }
      const response = await addAnswer(token, body, id);
      if (response.status == 201) {
        setLoaderVis(false);
        setNewAnswer(response.data.answer);
        setAnswerText("");
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error.status == 403) {
        setLoaderVis(false);
        setMessage("Login to answer!");
        setShowModal(true);
      }
      if (error.status == 500) {
        setLoaderVis(false);
        if (!answerText || answerText.trim() == "") {
          inputValidation(
            "You can't provide an empty answer!",
            "Your answer...",
            setAnsPLaceholder,
            setRedAnsAlert,
            setAnswerText
          );
        }
      }
    }
  };
  return (
    <div className={styles.answerForm}>
      {loaderVis && <Loader />}
      <div className={styles.textAndButton}>
        <textarea
          className={`${styles.inputTextArea} ${
            redAnsAlert && styles.redAlert
          }`}
          value={answerText}
          maxLength={900}
          placeholder={ansPlacholder}
          onChange={(e) => setAnswerText(e.target.value)}
        ></textarea>
        <p className={styles.charNumb}>{answerText.length}/900</p>
        <button
          onClick={() => {
            addAnAnswer();
          }}
        >
          Add answer
        </button>
      </div>
    </div>
  );
};
export default AnswerForm;
