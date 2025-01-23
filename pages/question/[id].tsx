/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { QuestionType, AnswerType } from "@/types";
import Answers from "@/components/Answers/Answers";
import LoginModal from "@/components/LoginModal/LoginModal";
import { decodeToken } from "@/utils/jwtTokenDecoded";
import DeleteQuestionModal from "@/components/DeleteQuestionModal/DeleteQuestionModal";
import AnswerForm from "@/components/AnswerForm/AnswerForm";
import QuestionPanel from "@/components/QuestionPanel/QuestionPanel";
import styles from "./styles.module.css";
import { getQuestion, updateAnswersNumberToQuestion } from "@/api/question";
import { useTranslation } from "react-i18next";

const MainQuestionPage = () => {
  const [question, setQuestion] = useState<null | QuestionType>(null);
  const [newAnswer, setNewAnswer] = useState<null | AnswerType>(null);
  const [showModal, setShowModal] = useState(false);
  const [showQustionDelModal, setShowQustionDelModal] = useState(false);
  const [message, setMessage] = useState("Login for full experience!");
  const { t } = useTranslation();

  const router = useRouter();
  const id = router.query.id as string;
  const token = cookie.get("jwt-token");
  const userIdFromToken: string | undefined = decodeToken(token!);
  const [region, setRegion] = useState("");

  const getAQuestion = async () => {
    const response = await getQuestion(id);
    setQuestion(response.data.question);
  };
  useEffect(() => {
    setRegion(localStorage.getItem("region")!);
  }, []);

  const updateAnAnswersNumberToQuestion = async (answerAmmount: number) => {
    const body = {
      answers: answerAmmount,
    };
    try {
      const response = await updateAnswersNumberToQuestion(body, id);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (id) {
      getAQuestion();
    }
  }, [id]);

  return (
    <PageTemplate>
      {question && (
        <>
          <QuestionPanel
            question={question}
            userIdFromToken={userIdFromToken}
            setShowQustionDelModal={setShowQustionDelModal}
            region={region}
          />
          <h2 className={styles.answers}>{t("Answers")}</h2>
          <Answers
            answer={newAnswer}
            updateAnAnswersNumberToQuestion={updateAnAnswersNumberToQuestion}
            region={region}
          />
          <AnswerForm
            setNewAnswer={setNewAnswer}
            setMessage={setMessage}
            setShowModal={setShowModal}
            id={id}
          />
        </>
      )}
      <LoginModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={message}
      />
      {showQustionDelModal && (
        <DeleteQuestionModal
          id={id}
          setShowQustionDelModal={setShowQustionDelModal}
          setShowModal={setShowModal}
          setMessage={setMessage}
        />
      )}
    </PageTemplate>
  );
};
export default MainQuestionPage;
