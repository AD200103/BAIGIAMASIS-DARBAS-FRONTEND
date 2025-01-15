/* eslint-disable @next/next/no-img-element */
import cookie from "js-cookie";
import styles from "./styles.module.css";
import like from "../../assets/img/like.svg";
import activeLike from "../../assets/img/likeActive.svg";
import { AxiosError } from "axios";
import { LikeDislikeButtonPropsType } from "@/types";
import { updateAnswerDislikeLikeStatus } from "@/api/answer";

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
  setShowLogModal,
}: LikePropsType) => {
  const updateAnswerLikeStatus = async () => {
    try {
      const token = cookie.get("jwt-token") as string;

      const body = {
        usersWhoDislikedTheAnswer: userDislikeIdArr.includes(userIdFromToken!)
          ? userDislikeIdArr.filter((userid) => userid !== userIdFromToken!)
          : userDislikeIdArr,

        usersWhoLikedTheAnswer: userLikeIdArr.includes(userIdFromToken!)
          ? userLikeIdArr.filter((userid) => userid !== userIdFromToken!)
          : [...userLikeIdArr, userIdFromToken!],
      };

      const response = await updateAnswerDislikeLikeStatus(id, body, token);

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
        setShowLogModal(true);
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
