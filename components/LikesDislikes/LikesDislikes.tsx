/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.css";
import LikeButton from "../LikeButton/LikeButton";
import DislikeButton from "../DislikeButton/DislikeButton";
import React, { useState } from "react";
import like from "../../assets/img/like.svg";
import dislike from "../../assets/img/dislike.svg";

type LikesDislikesPropsType = {
  id: string;
  usersWhoLikedTheAnswer: string[];
  usersWhoDislikedTheAnswer: string[];
  userIdFromToken: string | undefined;
  userId: string;
  setShowLogModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const LikesDislikes = ({
  id,
  usersWhoLikedTheAnswer,
  usersWhoDislikedTheAnswer,
  userIdFromToken,
  userId,
  setShowLogModal,
}: LikesDislikesPropsType) => {
  //===========================================================================
  const [userLikeIdArr, setUserLikeIdArr] = useState(usersWhoLikedTheAnswer);
  const [likeState, setLikeState] = useState(
    userLikeIdArr.includes(userIdFromToken!)
  );
  //===========================================================================
  const [userDislikeIdArr, setUserDislikeIdArr] = useState(
    usersWhoDislikedTheAnswer
  );
  const [dislikeState, setDislikeState] = useState(
    userDislikeIdArr.includes(userIdFromToken!)
  );
  //===========================================================================
  return (
    <div className={styles.likesBoth}>
      <div className={styles.like}>
        {userIdFromToken !== userId ? (
          <LikeButton
            setShowLogModal={setShowLogModal}
            id={id}
            userIdFromToken={userIdFromToken!}
            setUserDislikeIdArr={setUserDislikeIdArr}
            userDislikeIdArr={userDislikeIdArr}
            setDislikeState={setDislikeState}
            setUserLikeIdArr={setUserLikeIdArr}
            userLikeIdArr={userLikeIdArr}
            likeState={likeState}
            setLikeState={setLikeState}
          />
        ) : (
          <img alt="like" src={like.src}></img>
        )}
        <p>{userLikeIdArr.length}</p>
      </div>
      <div className={styles.like}>
        {userIdFromToken !== userId ? (
          <DislikeButton
            setShowLogModal={setShowLogModal}
            id={id}
            userIdFromToken={userIdFromToken!}
            setUserDislikeIdArr={setUserDislikeIdArr}
            userDislikeIdArr={userDislikeIdArr}
            dislikeState={dislikeState}
            setDislikeState={setDislikeState}
            setLikeState={setLikeState}
            setUserLikeIdArr={setUserLikeIdArr}
            userLikeIdArr={userLikeIdArr}
          />
        ) : (
          <img alt="dislike" src={dislike.src}></img>
        )}
        <p>{userDislikeIdArr.length}</p>
      </div>
    </div>
  );
};
export default LikesDislikes;
