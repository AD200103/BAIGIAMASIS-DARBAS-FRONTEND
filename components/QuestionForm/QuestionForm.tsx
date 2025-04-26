/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./styles.module.css";
import { SetStateAction, useEffect, useState } from "react";
import cookie from "js-cookie";
import { AxiosError } from "axios";
import { addQuestion } from "@/api/question";
import { useRouter } from "next/router";
import Loader from "../Loader/Loader";
import { useTranslation } from "react-i18next";
import QuestionTxtArea from "../QuestionTxtArea/QuestionTxtArea";
import { inputValidity, values } from "@/utils/inputValidation";
import QuestionTitle from "../QuestionTitle/QuestionTitle";
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
  const valuesForErrorCase = values({
    question,
    questionReq,
    questionPlaceholder,
    setQuestPLaceholder,
    setRedQuestAlert,
    setQuestion,
    title,
    titleReq,
    titlePlacholder,
    setTitlePLaceholder,
    setRedTitleAlert,
    setTitle,
  });
  const addAQuestion = async () => {
    try {
      const token = cookie.get("jwt-token") as string;
      if (token) {
        setLoaderVis(true);
      }
      inputValidity(valuesForErrorCase, setLoaderVis);
      const body = {
        question_text: question,
        title: title,
      };
      const response = await addQuestion(body, token);
      if (response.status == 201) {
        setQuestion("");
        setTitle("");
        router.push("/");
        sessionStorage.setItem("pageNumber", "1");
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error.status == 403) {
        setLoaderVis(false);
        setShowModal(true);
      }
    }
  };
  return (
    <div className={styles.main}>
      {loaderVis && <Loader />}
      <div className={styles.questionForm}>
        <div className={styles.titleAndQuestion}>
          <QuestionTitle
            redTitleAlert={redTitleAlert}
            title={title}
            titlePlacholder={titlePlacholder}
            setTitle={setTitle}
          />
          <QuestionTxtArea
            setQuestion={setQuestion}
            question={question}
            redQuestionAlert={redQuestionAlert}
            questionPlaceholder={questionPlaceholder}
          />
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
