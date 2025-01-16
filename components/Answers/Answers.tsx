/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AnswerCard from "../AnswerCard/AnswerCard";
import { AnswerType } from "@/types";
import { getAnswers } from "@/api/answer";
import Loader from "../Loader/Loader";
type AnswersPropsType = {
  answer: AnswerType | null;
  updateAnswersNumberToQuestion: (answers: number) => void;
};
const Answers = ({
  answer,
  updateAnswersNumberToQuestion,
}: AnswersPropsType) => {
  const router = useRouter();
  const id = router.query.id as string;
  const [answers, setAnswers] = useState<AnswerType[] | null>(null);

  const getAllAnswers = async () => {
    try {
      const response = await getAnswers(id);
      if (response.status == 200) {
        setAnswers(response.data.answers);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (answer) {
      setAnswers((prev) => [...prev!, answer]);
    }
  }, [answer]);
  useEffect(() => {
    if (id) {
      getAllAnswers();
    }
  }, [id]);
  useEffect(() => {
    if (answers) {
      updateAnswersNumberToQuestion(answers.length);
    }
  }, [answers && answers!.length]);

  return (
    <div className={styles.main}>
      {answers ? (
        answers
          .sort(
            (a, b) =>
              b.usersWhoLikedTheAnswer.length - a.usersWhoLikedTheAnswer.length
          )
          .map((a) => <AnswerCard key={a.id} {...a} setAnswers={setAnswers} />)
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default Answers;
