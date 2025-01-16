/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosError } from "axios";
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

const MainQuestionPage = () => {
  const [question, setQuestion] = useState<null | QuestionType>(null);
  const [newAnswer, setNewAnswer] = useState<null | AnswerType>(null);
  const [showModal, setShowModal] = useState(false);
  const [showQustionDelModal, setShowQustionDelModal] = useState(false);
  const [message, setMessage] = useState("Login for full experience!");

  const router = useRouter();
  const id = router.query.id as string;
  const token = cookie.get("jwt-token");
  const userIdFromToken: string | undefined = decodeToken(token!);

  const getQuestion = async () => {
    const response = await axios.get(`http://localhost:3002/questions/${id}`);
    setQuestion(response.data.question);
  };

  const updateAnswersNumberToQuestion = async (answerAmmount: number) => {
    const body = {
      answers: answerAmmount,
    };
    try {
      const response = await axios.put(
        `http://localhost:3002/question/${id}`,
        body
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (id) {
      getQuestion();
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
          />
          <h2>Answers</h2>
          <Answers
            answer={newAnswer}
            updateAnswersNumberToQuestion={updateAnswersNumberToQuestion}
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
