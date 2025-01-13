import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import axios from "axios";
import cookie from "js-cookie";
import LoginModal from "@/components/LoginModal/LoginModal";
const AskPage = () => {
  const [question, setQuestion] = useState("");
  const [title, setTitle] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const body = {
    question_text: question,
    title: title,
  };
  useEffect(() => {
    setToken(cookie.get("jwt-token"));
  }, []);

  const addQuestion = async () => {
    try {
      const headers = {
        authorization: cookie.get("jwt-token"),
      };
      const response = await axios.post(
        "http://localhost:3002/question",
        body,
        {
          headers,
        }
      );
      if (response.status == 201) {
        setQuestion("");
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageTemplate>
      <div className={styles.main}>
        <div className={styles.questionForm}>
          <input
            value={title}
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            maxLength={1000}
            value={question}
            placeholder="Enter your question..."
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
          <p>{question.length}</p>
          <button onClick={addQuestion}>Add question!</button>
        </div>
      </div>

      <div className={`${styles.modal} ${!token && styles.showModal}`}>
        <LoginModal />
      </div>
    </PageTemplate>
  );
};
export default AskPage;
