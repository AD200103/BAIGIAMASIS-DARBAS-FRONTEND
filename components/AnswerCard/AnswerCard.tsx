import styles from "./styles.module.css";
type AnswerCardPropsType = {
  answer: string;
  date: Date;
  email: string;
};
const AnswerCard = ({ answer, date, email }: AnswerCardPropsType) => {
  return (
    <div className={styles.main}>
      <p>{answer}</p>
      <div>
        <p>{date.toString()}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};
export default AnswerCard;
