/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.css";
import like from "../../assets/img/like.svg";
import activeLike from "../../assets/img/likeActive.svg";
import { useState } from "react";
import { UpdateAnswerLikeStatusType } from "@/types";

type LikeButtonPropsType = {
  setLikesAmmount: React.Dispatch<React.SetStateAction<number>>;
  updateAnswerLikeStatus: ({
    userLikeIdArr,
    setUserLikeIdArr,
    setLikesAmmount,
    setLikeState,
  }: UpdateAnswerLikeStatusType) => void;
  userIdFromToken: string;
  usersWhoLikedTheAnswer: string[];
};
const LikeButton = ({
  setLikesAmmount,
  updateAnswerLikeStatus,
  userIdFromToken,
  usersWhoLikedTheAnswer,
}: LikeButtonPropsType) => {
  const [userLikeIdArr, setUserLikeIdArr] = useState(usersWhoLikedTheAnswer);
  const [likeState, setLikeState] = useState(
    userLikeIdArr.includes(userIdFromToken!)
  );

  return (
    <button
      className={styles.main}
      onClick={() => {
        updateAnswerLikeStatus({
          userLikeIdArr,
          setUserLikeIdArr,
          setLikesAmmount,
          setLikeState,
        });
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
