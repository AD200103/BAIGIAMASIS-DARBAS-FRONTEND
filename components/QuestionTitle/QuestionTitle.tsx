import styles from "./styles.module.css";
type QuestionTitlePropsType = {
  redTitleAlert: boolean;
  title: string;
  titlePlacholder: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};
const QuestionTitle = ({
  redTitleAlert,
  title,
  titlePlacholder,
  setTitle,
}: QuestionTitlePropsType) => {
  return (
    <input
      className={`${styles.input} ${redTitleAlert && styles.redAlert}`}
      value={title}
      maxLength={40}
      type="text"
      placeholder={titlePlacholder}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};
export default QuestionTitle;
