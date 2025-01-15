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

  const deleteAnAnswer = async () => {
    const token = cookie.get("jwt-token") as string;
    console.log(token);
    try {
      const response = await deleteAnswer(id, token);
      if (response.status == 200) {
        setAnswers((prev) => prev!.filter((a) => a.id !== id));
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.status == 403) {
        setMessage("Login to delete your answer!");
        setShowLogModal(true);
      }
    }
  };

  return (
    <div className={styles.main}>
      <p>{answer_text}</p>
      <div>
        <p>{dateConvert(date)}, UTC+00</p>
        {userIdFromToken == userId ? <p>You</p> : <p>{name}</p>}
      </div>
      <LikesDislikes
        id={id}
        usersWhoLikedTheAnswer={usersWhoLikedTheAnswer}
        usersWhoDislikedTheAnswer={usersWhoDislikedTheAnswer}
        userIdFromToken={userIdFromToken!}
        userId={userId}
        setShowLogModal={setShowLogModal}
      />
      <LoginModal
        showModal={showLogModal}
        setShowModal={setShowLogModal}
        message={message}
      />
      {userIdFromToken == userId && (
        <button onClick={deleteAnAnswer}>Delete</button>
      )}
    </div>
  );
};
export default AnswerCard;
