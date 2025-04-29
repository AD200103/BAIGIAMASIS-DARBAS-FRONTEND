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
  updateAnAnswersNumberToQuestion: (answers: number) => void;
  region: string;
};
const Answers = ({
  answer,
  updateAnAnswersNumberToQuestion,
  region,
}: AnswersPropsType) => {
  const router = useRouter();
  const id = router.query.id as string;
  const [answers, setAnswers] = useState<AnswerType[] | []>([]);
  const [loaderVis, setLoaderVis] = useState(false);
  const getAllAnswers = async () => {
    try {
      setLoaderVis(true);
      const response = await getAnswers(id);
      if (response.status == 200) {
        setAnswers(response.data.answers);
        setLoaderVis(false);
      }
    } catch (err) {
      setLoaderVis(false);
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
      updateAnAnswersNumberToQuestion(answers.length);
    }
  }, [answers]);

  return (
    <div className={styles.main}>
      {loaderVis && <Loader />}
      {answers.length > 0 &&
        answers
          .sort(
            (a, b) =>
              b.usersWhoLikedTheAnswer.length - a.usersWhoLikedTheAnswer.length
          )
          .map((a) => (
            <AnswerCard
              key={a.id}
              {...a}
              setAnswers={setAnswers}
              region={region}
            />
          ))}
    </div>
  );
};
export default Answers;
