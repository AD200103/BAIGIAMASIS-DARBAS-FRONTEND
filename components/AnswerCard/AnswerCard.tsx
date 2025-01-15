import cookie from "js-cookie";
import axios from "axios";
import styles from "./styles.module.css";
import { dateConvert } from "@/utils/dateAndEmail";
import { decodeToken } from "@/utils/jwtTokenDecoded";
import { AnswerType } from "@/types";
import { useState } from "react";
import LikesDislikes from "../LikesDislikes/LikesDislikes";
import LoginModal from "../LoginModal/LoginModal";
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

  const deleteAnswer = async () => {
    const headers = { authorization: cookie.get("jwt-token") };
    try {
      const response = await axios.delete(
        `http://localhost:3002/answer/${id}`,
        { headers }
      );
      if (response.status == 200) {
        setAnswers((prev) => prev!.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.log(err);
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
        message={"Login to rate answers!"}
      />
      {userIdFromToken == userId && (
        <button onClick={deleteAnswer}>Delete</button>
      )}
    </div>
  );
};
export default AnswerCard;
