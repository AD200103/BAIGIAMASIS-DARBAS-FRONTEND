/* eslint-disable @next/next/no-img-element */
import cookie from "js-cookie";
import styles from "./styles.module.css";
import like from "../../assets/img/like.svg";
import activeLike from "../../assets/img/likeActive.svg";
import axios, { AxiosError } from "axios";
import { LikeDislikeButtonPropsType } from "@/types";

type LikePropsType = LikeDislikeButtonPropsType & { likeState: boolean };
const LikeButton = ({
  setLikesAmmount,
  userIdFromToken,
  id,
  setUserDislikeIdArr,
  userDislikeIdArr,
  setDislikeState,
  setDislikesAmmount,
  setUserLikeIdArr,
  userLikeIdArr,
  likeState,
  setLikeState,
}: LikePropsType) => {
  const updateAnswerLikeStatus = async () => {
    try {
      const headers = { authorization: cookie.get("jwt-token") };

      const body = {
        usersWhoDislikedTheAnswer: userDislikeIdArr.includes(userIdFromToken!)
          ? userDislikeIdArr.filter((userid) => userid !== userIdFromToken!)
          : userDislikeIdArr,

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
        const likedUsersArray = response.data.answer.usersWhoLikedTheAnswer;
        const dislikedUsersArray =
          response.data.answer.usersWhoDislikedTheAnswer;
        setUserLikeIdArr(likedUsersArray);
        setLikesAmmount(likedUsersArray.length);
        setLikeState(likedUsersArray.includes(userIdFromToken!));

        setUserDislikeIdArr(dislikedUsersArray);
        setDislikesAmmount(dislikedUsersArray.length);
        setDislikeState(dislikedUsersArray.includes(userIdFromToken!));
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
