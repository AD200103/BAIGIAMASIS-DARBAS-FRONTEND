/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AnswerCard from "../AnswerCard/AnswerCard";
import { AnswerType } from "@/types";

type AnswersPropsType = {
  answer: AnswerType | null;
  updateAnswersNumberToQuestion: (answers: number) => void;
};
const Answers = ({
  answer,
  updateAnswersNumberToQuestion,
}: AnswersPropsType) => {
  const router = useRouter();
  const id = router.query.id;
  const [answers, setAnswers] = useState<AnswerType[] | null>(null);
  const getAnswers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/question/${id}/answers`
      );
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
      getAnswers();
    }
  }, [id]);
  useEffect(() => {
    if (answers) {
      updateAnswersNumberToQuestion(answers.length);
    }
  }, [answers && answers!.length]);

  return (
    <div className={styles.main}>
      {answers &&
        answers
          .sort(
            (a, b) =>
              b.usersWhoLikedTheAnswer.length - a.usersWhoLikedTheAnswer.length
          )
          .map((a) => <AnswerCard key={a.id} {...a} setAnswers={setAnswers} />)}
    </div>
  );
};
export default Answers;
