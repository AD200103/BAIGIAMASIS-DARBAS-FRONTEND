import styles from "./styles.module.css";
type AnswerTextFieldPropsType = {
  redAnsAlert: boolean;
  answerText: string;
  ansPlacholder: string;
  setAnswerText: React.Dispatch<React.SetStateAction<string>>;
};
const AnswerTextField = ({
  redAnsAlert,
  answerText,
  ansPlacholder,
  setAnswerText,
}: AnswerTextFieldPropsType) => {
  return (
    <textarea
      className={`${styles.inputTextArea} ${redAnsAlert && styles.redAlert}`}
      value={answerText}
      maxLength={900}
      placeholder={ansPlacholder}
      onChange={(e) => setAnswerText(e.target.value)}
    ></textarea>
  );
};
export default AnswerTextField;
