import styles from "./styles.module.css";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
const DeleteQuestionModal = ({
  id,
  setShowQustionDelModal,
  setShowModal,
  setMessage,
}) => {
  const router = useRouter();
  const deleteQuestion = async () => {
    try {
      const headers = { authorization: cookie.get("jwt-token") };
      const response = await axios.delete(
        `http://localhost:3002/question/${id}`,
        { headers }
      );
      if (response.status == 200) {
        router.push("/");
      }
    } catch (err) {
      setShowQustionDelModal(false);
      setMessage("Login to delete your question!");
      setShowModal(true);
      console.log(err);
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.panel}>
        <h1>Are you sure you want to delete this question?</h1>
        <button onClick={deleteQuestion}>Yes</button>
        <button onClick={() => setShowQustionDelModal(false)}>No</button>
      </div>
    </div>
  );
};
export default DeleteQuestionModal;
