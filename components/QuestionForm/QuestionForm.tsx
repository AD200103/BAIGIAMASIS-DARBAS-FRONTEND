/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./styles.module.css";
import { SetStateAction, useEffect, useState } from "react";
import cookie from "js-cookie";
import { AxiosError } from "axios";
import { addQuestion } from "@/api/question";
import { inputValidation } from "@/utils/inputValidation";
import { useRouter } from "next/router";
import Loader from "../Loader/Loader";
import { useTranslation } from "react-i18next";

type QuestionFormPropsType = {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
};
const QuestionForm = ({ setShowModal }: QuestionFormPropsType) => {
  const [question, setQuestion] = useState("");
  const [title, setTitle] = useState("");
  const [loaderVis, setLoaderVis] = useState(false);
  const [questionPlaceholder, setQuestPLaceholder] = useState("");
  const [titlePlacholder, setTitlePLaceholder] = useState("");
  const [questionReq, setQuestionReq] = useState("");
  const [titleReq, setTitleReq] = useState("");
  const [redQuestionAlert, setRedQuestAlert] = useState(false);
  const [redTitleAlert, setRedTitleAlert] = useState(false);
  const [addQ, setAddQ] = useState("");
  const router = useRouter();

  const { t } = useTranslation();
  useEffect(() => {
    setTitlePLaceholder(t("titlePlacholder"));
    setQuestPLaceholder(t("questionPlaceholder"));
    setQuestionReq(t("QuestionReq"));
    setTitleReq(t("setTitleReq"));
    setAddQ(t("AddQuestion"));
  }, [addQ]);

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
        localStorage.setItem("pageNumber", "1");
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
            questionReq,
            questionPlaceholder,
            setQuestPLaceholder,
            setRedQuestAlert,
            setQuestion
          );
        }
        if (!title || title.trim() == "") {
          inputValidation(
            titleReq,
            titlePlacholder,
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
          {addQ}
        </button>
      </div>
    </div>
  );
};
export default QuestionForm;
