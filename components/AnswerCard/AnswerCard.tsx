import styles from "./styles.module.css";
import cookie from "js-cookie";
import { emailConvert, dateConvert } from "@/utils/dateAndEmail";
type AnswerCardPropsType = {
  answer: string;
  date: Date;
  email: string;
};

const AnswerCard = ({ answer, date, email }: AnswerCardPropsType) => {
  const userEmail = cookie.get("user-email");
  return (
    <div className={styles.main}>
      <p>{answer}</p>
      <div>
        <p>{dateConvert(date)}, UTC+00</p>
        <p>{emailConvert(email)}</p>
      </div>
      {userEmail == email ? <button>Delete</button> : <></>}
    </div>
  );
};
export default AnswerCard;
