import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { QuestionType } from "@/types";
import { dateConvert, emailConvert } from "@/utils/dateAndEmail";
import Answers from "@/components/Answers/Answers";
import styles from "./styles.module.css";
const MainQuestionPage = () => {
  const [question, setQuestion] = useState<null | QuestionType>(null);
  const [answer, setAnswer] = useState<string>("");

  const router = useRouter();
  const id = router.query.id;

  const getQuestion = async () => {
    const response = await axios.get(`http://localhost:3002/questions/${id}`);
    setQuestion(response.data.question);
  };

  const addAnswer = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3002/question/${id}/answers`
      );
      console.log(response);
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
              <p>Asked by: {emailConvert(question?.email)}</p>
              <p>At: {dateConvert(question?.date)}, UTC+00</p>
            </div>
          </div>
        )}
        <h2>Answers</h2>
        <Answers />
        <div className={styles.answerForm}>
          <textarea
            value={answer}
            maxLength={900}
            placeholder="Your answer..."
            onChange={(e) => setAnswer(e.target.value)}
          ></textarea>
          <button onClick={addAnswer}>Add answer</button>
        </div>
      </PageTemplate>
    </>
  );
};
export default MainQuestionPage;
