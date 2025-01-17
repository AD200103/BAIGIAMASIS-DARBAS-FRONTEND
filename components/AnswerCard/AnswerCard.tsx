import cookie from "js-cookie";
import styles from "./styles.module.css";
import { dateConvert } from "@/utils/dateAndEmail";
import { decodeToken } from "@/utils/jwtTokenDecoded";
import { AnswerType } from "@/types";
import { useState } from "react";
import LikesDislikes from "../LikesDislikes/LikesDislikes";
import LoginModal from "../LoginModal/LoginModal";
import { deleteAnswer } from "@/api/answer";
import { AxiosError } from "axios";
import Loader from "../Loader/Loader";
type AnswerCardPropsType = {
  answer_text: string;
  date: Date;
  id: string;
  name: string;
  userId: string;
  usersWhoLikedTheAnswer: string[];
  usersWhoDislikedTheAnswer: string[];
  setAnswers: React.Dispatch<React.SetStateAction<AnswerType[] | null>>;
};
const AnswerCard = ({
  answer_text,
  date,
  name,
  id,
  userId,
  usersWhoLikedTheAnswer,
  usersWhoDislikedTheAnswer,
  setAnswers,
}: AnswerCardPropsType) => {
  const userIdFromToken = decodeToken(cookie.get("jwt-token")!);
  const [showLogModal, setShowLogModal] = useState(false);
  const [message, setMessage] = useState("Login to rate answers!");
  const [loaderVis, setLoaderVis] = useState(false);

  const deleteAnAnswer = async () => {
    const token = cookie.get("jwt-token") as string;
    if (token) {
      setLoaderVis(true);
    }
    console.log(token);
    try {
      const response = await deleteAnswer(id, token);
      if (response.status == 200) {
        setLoaderVis(false);
        setAnswers((prev) => prev!.filter((a) => a.id !== id));
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.status == 403) {
        setLoaderVis(false);
        setMessage("Login to delete your answer!");
        setShowLogModal(true);
      }
    }
  };

  return (
    <div className={styles.main}>
      {loaderVis && <Loader />}
      <p className={styles.ansText}>Answer: {answer_text}</p>
      {userIdFromToken == userId && (
        <button className={styles.delBtn} onClick={deleteAnAnswer}>
          X
        </button>
      )}
      <div className={styles.likesNameDate}>
        <LikesDislikes
          id={id}
          usersWhoLikedTheAnswer={usersWhoLikedTheAnswer}
          usersWhoDislikedTheAnswer={usersWhoDislikedTheAnswer}
          userIdFromToken={userIdFromToken!}
          userId={userId}
          setShowLogModal={setShowLogModal}
        />
        <div className={styles.nameDate}>
          {userIdFromToken == userId ? (
            <p>
              Answered by: <span className={styles.youClass}>You</span>
            </p>
          ) : (
            <p>
              Answered by: <span className={styles.userClass}>{name}</span>
            </p>
          )}
          <p>At: {dateConvert(date)}, UTC+00</p>
        </div>
      </div>
      <LoginModal
        showModal={showLogModal}
        setShowModal={setShowLogModal}
        message={message}
      />
    </div>
  );
};
export default AnswerCard;
