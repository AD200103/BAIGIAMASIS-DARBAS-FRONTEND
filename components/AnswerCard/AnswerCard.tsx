import cookie from "js-cookie";
import axios from "axios";
import styles from "./styles.module.css";
import { dateConvert } from "@/utils/dateAndEmail";
import { AnswerType } from "@/types";
type AnswerCardPropsType = {
  answer: string;
  date: Date;
  email: string;
  id: string;
  name: string;
  setAnswers: React.Dispatch<React.SetStateAction<AnswerType[]>>;
};

const AnswerCard = ({
  answer,
  date,
  email,
  name,
  id,
  setAnswers,
}: AnswerCardPropsType) => {
  const headers = { authorization: cookie.get("jwt-token") };

  const deleteAnswer = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/answer/${id}`,
        { headers }
      );
      if (response.status == 200) {
        setAnswers((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const userEmail = cookie.get("user-email");

  return (
    <div className={styles.main}>
      <p>{answer}</p>
      <div>
        <p>{dateConvert(date)}, UTC+00</p>
        <p>{name}</p>
      </div>
      {userEmail == email ? (
        <button onClick={deleteAnswer}>Delete</button>
      ) : (
        <></>
      )}
    </div>
  );
};
export default AnswerCard;
