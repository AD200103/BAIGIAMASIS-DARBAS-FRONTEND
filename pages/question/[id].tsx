/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { QuestionType, AnswerType } from "@/types";
import { dateConvert } from "@/utils/dateAndEmail";
import Answers from "@/components/Answers/Answers";
import styles from "./styles.module.css";

const MainQuestionPage = () => {
  const [question, setQuestion] = useState<null | QuestionType>(null);
  const [answerText, setAnswerText] = useState<string>("");
  const [newAnswer, setNewAnswer] = useState<null | AnswerType>(null);

  const router = useRouter();
  const id = router.query.id;
  const token = cookie.get("jwt-token");

  const getQuestion = async () => {
    const response = await axios.get(`http://localhost:3002/questions/${id}`);
    setQuestion(response.data.question);
  };

  const body = {
    answer_text: answerText,
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

  const addAnswer = async () => {
    try {
      const headers = {
        authorization: token,
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
        router.push("/signin");
      }
    }
  };

  useEffect(() => {
    if (id) {
      getQuestion();
    }
  }, [id]);

  return (
    <>
      <PageTemplate>
        {question && (
          <div>
            <h1>{question.title}</h1>
            <p>{question.question_text}</p>
            <div className={styles.dateEmailBox}>
              <p>Asked by: {question?.name}</p>
              <p>At: {dateConvert(question?.date)}, UTC+00</p>
            </div>
          </div>
        )}
        <h2>Answers</h2>
        <Answers
          answer={newAnswer}
          updateAnswersNumberToQuestion={updateAnswersNumberToQuestion}
        />
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
      </PageTemplate>
    </>
  );
};
export default MainQuestionPage;
