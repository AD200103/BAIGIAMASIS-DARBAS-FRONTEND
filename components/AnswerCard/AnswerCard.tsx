import cookie from "js-cookie";
import axios, { AxiosError } from "axios";
import styles from "./styles.module.css";
import { dateConvert } from "@/utils/dateAndEmail";
import { decodeToken } from "@/utils/jwtTokenDecoded";
import { AnswerType } from "@/types";
import { useState } from "react";

type AnswerCardPropsType = {
  answer: string;
  date: Date;
  id: string;
  name: string;
  userId: string;
  likes: number;
  dislikes: number;
  setAnswers: React.Dispatch<React.SetStateAction<AnswerType[] | null>>;
};

const AnswerCard = ({
  answer,
  date,
  name,
  id,
  userId,
  likes,
  dislikes,
  setAnswers,
}: AnswerCardPropsType) => {
  const token = cookie.get("jwt-token");
  const userIdFromToken = decodeToken(token!);
  const [liked, setLiked] = useState(false);
  // const [disliked, setDisliked] = useState(false);

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

  const updateAnswerLikeStatus = async () => {
    const headers = { authorization: cookie.get("jwt-token") };
    try {
      setLiked(!liked);
      const body = {
        gained_likes_number: !liked ? likes + 1 : likes,
      };
      const response = await axios.put(
        `http://localhost:3002/answer/${id}`,
        body,
        {
          headers,
        }
      );
      if (response.status == 200) {
        return;
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error.status == 403) {
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.main}>
      <p>{answer}</p>
      <div>
        <p>{dateConvert(date)}, UTC+00</p>
        {userIdFromToken == userId ? <p>You</p> : <p>{name}</p>}
      </div>
      <div>
        <div className={styles.likes}>
          {userIdFromToken !== userId ? (
            <button
              onClick={() => {
                updateAnswerLikeStatus();
              }}
            >
              Like
            </button>
          ) : (
            <button>Like</button>
          )}
          <p>Likes:{likes}</p>
        </div>
        <div className={styles.dislikes}>
          <button>Dislike</button>
          <p>Dislikes:{dislikes}</p>
        </div>
      </div>
      {userIdFromToken == userId ? (
        <button onClick={deleteAnswer}>Delete</button>
      ) : (
        <></>
      )}
    </div>
  );
};
export default AnswerCard;
