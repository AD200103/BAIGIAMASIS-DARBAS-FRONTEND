import styles from "./styles.module.css";
type QuestionTxtAreaType = {
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  question: string;
  redQuestionAlert: boolean;
  questionPlaceholder: string;
};
const QuestionTxtArea = ({
  setQuestion,
  question,
  redQuestionAlert,
  questionPlaceholder,
}: QuestionTxtAreaType) => {
  return (
    <textarea
      className={`${styles.textareaInput} ${
        redQuestionAlert && styles.redAlert
      }`}
      maxLength={1000}
      value={question}
      placeholder={questionPlaceholder}
      onChange={(e) => setQuestion(e.target.value)}
    ></textarea>
  );
};
export default QuestionTxtArea;
