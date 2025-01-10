/* eslint-disable @next/next/no-img-element */
import cookie from "js-cookie";
import styles from "./styles.module.css";
import like from "../../assets/img/like.svg";
import activeLike from "../../assets/img/likeActive.svg";
import { useState } from "react";
import axios, { AxiosError } from "axios";

type LikeButtonPropsType = {
  setLikesAmmount: React.Dispatch<React.SetStateAction<number>>;
  userIdFromToken: string;
  usersWhoLikedTheAnswer: string[];
  id: string;
};
const LikeButton = ({
  setLikesAmmount,
  userIdFromToken,
  usersWhoLikedTheAnswer,
  id,
}: LikeButtonPropsType) => {
  const [userLikeIdArr, setUserLikeIdArr] = useState(usersWhoLikedTheAnswer);
  const [likeState, setLikeState] = useState(
    userLikeIdArr.includes(userIdFromToken!)
  );

  const updateAnswerLikeStatus = async () => {
    try {
      const headers = { authorization: cookie.get("jwt-token") };

      const body = {
        usersWhoLikedTheAnswer: userLikeIdArr.includes(userIdFromToken!)
          ? userLikeIdArr.filter((userid) => userid !== userIdFromToken!)
          : [...userLikeIdArr, userIdFromToken!],
      };

      const response = await axios.put(
        `http://localhost:3002/answer/${id}`,
        body,
        {
          headers,
        }
      );

      if (response.status == 200) {
        console.log(response.data.answer);
        const usersArray = response.data.answer.usersWhoLikedTheAnswer;
        setUserLikeIdArr(usersArray);
        setLikesAmmount(usersArray.length);
        setLikeState(usersArray.includes(userIdFromToken!));
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error.status == 403) {
        console.log(err);
      }
    }
  };

  return (
    <button
      className={styles.main}
      onClick={() => {
        updateAnswerLikeStatus();
      }}
    >
      {likeState ? (
        <img src={activeLike.src} alt="active-like" />
      ) : (
        <img src={like.src} alt="like" />
      )}
    </button>
  );
};
export default LikeButton;
