import styles from "./styles.module.css";
import { SetStateAction, useState } from "react";
import cookie from "js-cookie";
import { AxiosError } from "axios";
import { addQuestion } from "@/api/question";
type QuestionFormPropsType = {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
};
const QuestionForm = ({ setShowModal }: QuestionFormPropsType) => {
  const [question, setQuestion] = useState("");
  const [title, setTitle] = useState("");

  const addAQuestion = async () => {
    try {
      const body = {
        question_text: question,
        title: title,
      };
      const token = cookie.get("jwt-token") as string;
      const response = await addQuestion(body, token);
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
        <button onClick={addAQuestion}>Add question!</button>
      </div>
    </div>
  );
};
export default QuestionForm;
