/* eslint-disable @next/next/no-img-element */
import cookie from "js-cookie";
import axios, { AxiosError } from "axios";
import styles from "./styles.module.css";
import { dateConvert } from "@/utils/dateAndEmail";
import { decodeToken } from "@/utils/jwtTokenDecoded";
import { AnswerType } from "@/types";
import { useState } from "react";
import like from "../../assets/img/like.svg";
import activeLike from "../../assets/img/likeActive.svg";

type AnswerCardPropsType = {
  answer: string;
  date: Date;
  id: string;
  name: string;
  userId: string;
  likes: number;
  dislikes: number;
  likeStatus: boolean;
  usersWhoLikedTheAnswer: string[];
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
  usersWhoLikedTheAnswer,
  likeStatus,
  setAnswers,
}: AnswerCardPropsType) => {
  const token = cookie.get("jwt-token");
  const userIdFromToken = decodeToken(token!);
  const [likesAmmount, setLikesAmmount] = useState(likes);
  const [userIdArr, setUserIdArr] = useState(usersWhoLikedTheAnswer);

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
    try {
      const headers = { authorization: cookie.get("jwt-token") };
      const body = {
        // usersWhoLikedTheAnswer: userIdArr,
        // like_status: !likeStatus,
        // gained_likes_number: likeStatus == true ? likes : likes + 1,
      };
      const response = await axios.put(
        `http://localhost:3002/answer/${id}`,
        body,
        {
          headers,
        }
      );
      if (response.status == 200) {
        setAnswers((prev) =>
          prev!.map((a) =>
            a.id == id ? { ...a, like_status: !a.like_status } : a
          )
        );
        // setLikesAmmount(body.gained_likes_number);
        // if (!userIdArr.includes(userIdFromToken!) && likeStatus == true) {
        //   setUserIdArr((prev) => [...prev, userIdFromToken!]);
        // }
        // if (userIdArr.includes(userIdFromToken!) && likeStatus == false) {
        //   setUserIdArr((prev) =>
        //     prev.filter((userid) => userid !== userIdFromToken)
        //   );
        // }
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
              {userIdArr.includes(userIdFromToken!) ? (
                <img src={activeLike.src} alt="active-like" />
              ) : (
                <img src={like.src} alt="like" />
              )}
            </button>
          ) : (
            <button>Like</button>
          )}
          <p>Likes:{likesAmmount}</p>
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
