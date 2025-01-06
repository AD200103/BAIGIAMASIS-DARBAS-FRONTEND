import axios from "axios";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AnswerCard from "../AnswerCard/AnswerCard";
import { AnswerType } from "@/types";
type NewAnswerType = {
  answer: AnswerType | null;
};
const Answers = ({ answer }: NewAnswerType) => {
  const router = useRouter();
  const id = router.query.id;
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const getAnswers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/question/${id}/answers`
      );
      setAnswers(response.data.answers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (answer) {
      setAnswers((prev) => [...prev, answer]);
    }
  }, [answer]);
  useEffect(() => {
    if (id) {
      getAnswers();
    }
  }, [id]);

  return (
    <div className={styles.main}>
      {answers &&
        answers.map((a) => (
          <AnswerCard
            key={a.id}
            id={a.id}
            answer={a.answer_text}
            date={a.date}
            email={a.email}
            setAnswers={setAnswers}
          />
        ))}
    </div>
  );
};
export default Answers;
