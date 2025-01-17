import styles from "./styles.module.css";
import { SetStateAction, useState } from "react";
import cookie from "js-cookie";
import { AxiosError } from "axios";
import { addQuestion } from "@/api/question";
import { inputValidation } from "@/utils/inputValidation";
import { useRouter } from "next/router";
import Loader from "../Loader/Loader";
type QuestionFormPropsType = {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
};
const QuestionForm = ({ setShowModal }: QuestionFormPropsType) => {
  const [question, setQuestion] = useState("");
  const [title, setTitle] = useState("");
  const [loaderVis, setLoaderVis] = useState(false);
  const [questionPlaceholder, setQuestPLaceholder] = useState(
    "Enter your question..."
  );
  const [titlePlacholder, setTitlePLaceholder] = useState("Title");
  const [redQuestionAlert, setRedQuestAlert] = useState(false);
  const [redTitleAlert, setRedTitleAlert] = useState(false);
  const router = useRouter();
  const addAQuestion = async () => {
    try {
      const body = {
        question_text: question,
        title: title,
      };
      const token = cookie.get("jwt-token") as string;
      if (token) {
        setLoaderVis(true);
      }
      const response = await addQuestion(body, token);
      if (response.status == 201) {
        setQuestion("");
        setTitle("");
        router.push("/");
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error.status == 403) {
        setLoaderVis(false);
        setShowModal(true);
      }
      if (error.status == 500) {
        setLoaderVis(false);
        if (!question || question.trim() == "") {
          inputValidation(
            "You can't ask an empty question!",
            "Enter your question...",
            setQuestPLaceholder,
            setRedQuestAlert,
            setQuestion
          );
        }
        if (!title || title.trim() == "") {
          inputValidation(
            "Title is required!",
            "Title",
            setTitlePLaceholder,
            setRedTitleAlert,
            setTitle
          );
        }
      }
    }
  };
  return (
    <div className={styles.main}>
      {loaderVis && <Loader />}
      <div className={styles.questionForm}>
        <div className={styles.titleAndQuestion}>
          <input
            className={`${styles.input} ${redTitleAlert && styles.redAlert}`}
            value={title}
            maxLength={40}
            type="text"
            placeholder={titlePlacholder}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className={`${styles.textareaInput} ${
              redQuestionAlert && styles.redAlert
            }`}
            maxLength={1000}
            value={question}
            placeholder={questionPlaceholder}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
        </div>
        <p>{question.length}/1000</p>
        <button className={styles.addQuestionBtn} onClick={addAQuestion}>
          Add question!
        </button>
      </div>
    </div>
  );
};
export default QuestionForm;
