import styles from "./styles.module.css";
import { SetStateAction, useState } from "react";
import cookie from "js-cookie";
import axios, { AxiosError } from "axios";
type QuestionFormPropsType = {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
};
const QuestionForm = ({ setShowModal }: QuestionFormPropsType) => {
  const [question, setQuestion] = useState("");
  const [title, setTitle] = useState("");
  const addQuestion = async () => {
    try {
      const body = {
        question_text: question,
        title: title,
      };
      const headers = {
        authorization: cookie.get("jwt-token"),
      };
      const response = await axios.post(
        "http://localhost:3002/question",
        body,
        {
          headers,
        }
      );
      if (response.status == 201) {
        setQuestion("");
        setTitle("");
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error.status == 403) {
        setShowModal(true);
      }
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.questionForm}>
        <input
          value={title}
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          maxLength={1000}
          value={question}
          placeholder="Enter your question..."
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
        <p>{question.length}</p>
        <button onClick={addQuestion}>Add question!</button>
      </div>
    </div>
  );
};
export default QuestionForm;
