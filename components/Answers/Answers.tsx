import axios from "axios";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AnswerCard from "../AnswerCard/AnswerCard";
import { AnswerType } from "@/types";

type NewAnswerType = {
  answer: AnswerType | null;
  updateAnswersNumberToQuestion: (answers: number) => void;
};
const Answers = ({ answer, updateAnswersNumberToQuestion }: NewAnswerType) => {
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
    console.log("o");
  }, [id]);
  useEffect(() => {
    if (answers) {
      updateAnswersNumberToQuestion(answers.length);
    }
  }, [answers]);

  return (
    <div className={styles.main}>
      {answers &&
        answers.map((a) => (
          <AnswerCard
            key={a.id}
            id={a.id}
            answer={a.answer_text}
            date={a.date}
            name={a.name}
            userId={a.userId}
            likes={a.gained_likes_number}
            dislikes={a.gained_dislikes_number}
            setAnswers={setAnswers}
          />
        ))}
    </div>
  );
};
export default Answers;
